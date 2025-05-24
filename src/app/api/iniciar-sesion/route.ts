import { createClient } from "@/auth/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { auth } = await createClient();
  const { email, password } = await req.json();

  const { data, error } = await auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ user: data.user }, { status: 200 });
}
