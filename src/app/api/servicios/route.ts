// app/api/citas/route.ts
import { supabase } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("servicios")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
