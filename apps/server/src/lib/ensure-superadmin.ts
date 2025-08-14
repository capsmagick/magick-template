import { auth } from "./auth";
import { client } from "../db";

type EnsureArgs = {
  email: string;
  password: string;
  name: string;
  role?: string | string[];
};

export async function ensureSuperAdmin(args: EnsureArgs): Promise<void> {
  const { email, password, name, role = "superadmin" } = args;

  const ctx = await auth.$context;

  // Check if user exists by email
  const existing = await ctx.adapter
    .findOne({
      model: "user",
      where: [
        {
          field: "email",
          value: email,
        },
      ],
    })
    .catch(() => null);

  if (existing) {
    const existingUser = existing as { id: string };
    // Use admin API to ensure credential account password and role
    // Use admin API endpoints (types expect specific literals but runtime accepts string|string[])
    await auth.api.setUserPassword({
      body: { userId: existingUser.id, newPassword: password },
    }).catch(() => { });
    await auth.api.setRole({
      body: { userId: existingUser.id, role: Array.isArray(role) ? role.join(",") : role },
    }).catch(async () => {
      await ctx.adapter.update({
        model: "user",
        where: [{ field: "id", value: existingUser.id }],
        update: { role: Array.isArray(role) ? (role as any).join(",") : (role as any) },
      }).catch(() => { });
    });
    return;
  }

  // Create user via Better Auth API (handles hashing and account creation)
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
  } catch {
    // If already exists, ignore
  }

  // Ensure role after creation
  const created = await ctx.adapter
    .findOne({
      model: "user",
      where: [
        { field: "email", value: email },
      ],
    })
    .catch(() => null);
  if (created) {
    const createdUser = created as { id: string };
    await ctx.adapter.update({
      model: "user",
      where: [
        { field: "id", value: createdUser.id },
      ],
      update: {
        // biome-ignore lint/suspicious/noExplicitAny: plugin augments schema
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        role: Array.isArray(role) ? role.join(",") : (role as any),
      },
    }).catch(() => { });
  }
}


