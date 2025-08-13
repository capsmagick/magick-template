import type { Context as ElysiaContext } from "elysia";
import { auth } from "./auth";

export type CreateContextOptions = {
  context: ElysiaContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });
  return {
    session,
    request: context.request,
  };
}


export type Context = Awaited<ReturnType<typeof createContext>>;
