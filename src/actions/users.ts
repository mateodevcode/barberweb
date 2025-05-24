"use server";

import { createClient } from "@/auth/server";
import { supabase } from "@/lib/supabaseServer";
import { handleError } from "@/lib/utils";

export const loginAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const logOutAction = async () => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signOut();
    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const signUpAction = async (
  email: string,
  password: string,
  name: string,
  image: string
) => {
  try {
    const { auth } = await createClient();

    const { data, error } = await auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Error signing up");

    if (userId) {
      const { error: insertError } = await supabase.from("users").insert({
        id: userId,
        name,
        role: "user",
        image,
      });

      if (insertError) {
        console.error("Insert error:", insertError);
      }
    }

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
