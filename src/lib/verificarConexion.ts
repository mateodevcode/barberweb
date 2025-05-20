// lib/verificarConexion.ts
import { supabase } from "./supabaseClient";

export const verificarConexion = async () => {
  const { data, error } = await supabase.from("barberos").select("*");

  if (error) {
    console.error("❌ Error de conexión:", error.message);
    return false;
  }

  console.log("✅ Conexión exitosa a Supabase");
  console.log("✅ Datos de prueba:", data);

  return true;
};
