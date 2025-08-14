import "dotenv/config";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { RPCHandler } from "@orpc/server/fetch";
import { createCORSConfig, createSwaggerConfig } from "@repo/shared-core/deps/elysia";
import { appRouter } from "./routers";
import { createContext } from "./lib/context";
import { auth } from "./lib/auth";
import { getServerConfig } from "@repo/shared-core/config/server";

const handler = new RPCHandler(appRouter);

const serverConfig = getServerConfig(process.env.NODE_ENV as "development" | "production");
const corsConfig = createCORSConfig(serverConfig.trustedOrigins);
const swaggerConfig = createSwaggerConfig("Magick Template API");

// Debug server configuration
console.log("🔧 Server Configuration:", JSON.stringify(serverConfig, null, 2));

const app = new Elysia()
  .use(cors(corsConfig))
  .use(swagger(swaggerConfig))
  .mount(auth.handler)
  .all('/rpc*', async (context) => {
    console.log("RPC request received:", context.request.method, context.request.url);
    console.log("Request headers:", Object.fromEntries(context.request.headers.entries()));

    try {
      const { response } = await handler.handle(context.request, {
        prefix: '/rpc',
        context: await createContext({ context })
      });
      console.log("RPC response:", response);
      return response ?? new Response('Not Found', { status: 404 });
    } catch (error) {
      console.error("RPC error:", error);
      return new Response(`RPC Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
    }
  }, {
    parse: 'none' // Disable Elysia body parser to prevent "body already used" error
  })
  .get("/", () => "OK", {
    detail: {
      summary: "Health Check",
      description: "Simple health check endpoint",
      tags: ["Health"]
    }
  })
  .get("/api/health", () => ({ status: "OK", timestamp: new Date().toISOString() }), {
    detail: {
      summary: "API Health Check",
      description: "Detailed health check with timestamp",
      tags: ["Health"]
    }
  })
  .get("/api/info", () => ({
    name: "Magick Template API",
    version: "1.0.0",
    description: "API server with ORPC integration"
  }), {
    detail: {
      summary: "API Information",
      description: "Get API server information",
      tags: ["Info"]
    }
  })
  .listen(serverConfig.port, (server) => {
    const url = server.url;
    console.log(`✅ Server is running on ${url}`);
    console.log(`📚 Swagger documentation available at ${url}swagger`);
  });
