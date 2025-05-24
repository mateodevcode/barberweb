"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import { ContextApp } from "@/context/ContextApp";

// Tipado de props del componente
interface FormIniciarSesionProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
}

export function FormIniciarSesion({
  className,
  ...props
}: FormIniciarSesionProps) {
  const { router, setIdUser } = useContext(ContextApp);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [verContraseña, setVerContraseña] = useState(false);
  const [, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/iniciar-sesion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const { error, user } = await res.json();
    setIdUser(user.id);
    if (!res.ok) {
      setError(error);
    } else {
      router.push("/");
      toast.success("Inicio de sesión exitoso.", {
        description: "Bienvenido de nuevo.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Inicia sesión</h1>
        <p className="text-balance text-sm text-zinc-400">
          Ingresa tu email para acceder a tu cuenta
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative flex items-center gap-4">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-10 pr-10 bg-transparent focus"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <a
              href="/olvidaste-tu-contrasena"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="relative flex items-center gap-4">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={verContraseña ? "text" : "password"}
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="pl-10"
            />
            <div className="absolute right-3 top-2.5 h-4 w-4">
              {verContraseña ? (
                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setVerContraseña(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className="cursor-pointer"
                  onClick={() => setVerContraseña(true)}
                />
              )}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-zinc-800 cursor-pointer select-none"
        >
          Iniciar sesión
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 px-2 text-zinc-400">
            O continúa con
          </span>
        </div>

        <Button
          variant="outline"
          className="w-full cursor-pointer select-none"
          type="submit"
        >
          <FcGoogle />
          Iniciar sesión con Google
        </Button>
      </div>

      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/registrarse"
          className="font-semibold hover:text-zinc-700 hover:underline"
        >
          Regístrate
        </Link>
      </div>

      <div className="flex items-center justify-center text-sm mt-4">
        <Link
          href="/"
          className="font-semibold text-zinc-500 flex items-center hover:text-zinc-300 cursor-pointer select-none"
        >
          <GoHome className="mr-2 h-4 w-4" />
          Inicio
        </Link>
      </div>
    </form>
  );
}
