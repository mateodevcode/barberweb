import { createClient } from "@/auth/server";
import { supabase } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, name, image } = await req.json();

  const { auth } = await createClient();

  const { data, error } = await auth.signUp({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const user = data.user;

  if (user) {
    const { error: insertError } = await supabase.from("users").insert({
      id: user.id,
      name,
      role: "user",
      image,
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Registro exitoso" }, { status: 200 });
}
