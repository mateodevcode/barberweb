"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircleIcon, Lock, Mail, User } from "lucide-react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { ContextApp } from "@/context/ContextApp";

interface FormData {
  name: string;
  email: string;
  password: string;
  image: string;
}

interface FormRegistrarseProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
}

export function FormRegistrarse({ className, ...props }: FormRegistrarseProps) {
  const { router } = useContext(ContextApp);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [verContraseña, setVerContraseña] = useState<boolean>(false);
  const [errores, setErrores] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/registrarse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          image: formData.image,
        }),
      });

      if (res.ok) {
        toast.success("Registro exitoso.", {
          description: "Hemos enviado un correo de verificación a tu email.",
          duration: 5000,
          position: "top-center",
        });
        router.push("/iniciar-sesion");
      } else {
        const error = await res.json();
        setErrores(error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al registrar la cuenta. Inténtalo de nuevo.", {
        description: "Por favor, verifica tu conexión a internet.",
        duration: 5000,
        position: "top-center",
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
        <h1 className="text-2xl font-bold">Crear una cuenta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Ingresa tu email para registrarte en BarberShop
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre completo</Label>
          <div className="relative flex items-center gap-4">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Juan Pérez"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="pl-10 pr-10"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative flex items-center gap-4">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="pl-10 pr-10"
            />
          </div>
        </div>
        {false && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>
              El usuario ya existe, inicia sesión.
            </AlertDescription>
          </Alert>
        )}
        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative flex items-center gap-4">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={verContraseña ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="********"
              className="pl-10 pr-10"
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
        {errores && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>{errores}</AlertDescription>
          </Alert>
        )}
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer select-none"
        >
          Registrarse
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            O continúa con
          </span>
        </div>

        <Button
          variant="outline"
          className="w-full cursor-pointer select-none"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <FcGoogle />
          Registrarse con Google
        </Button>
      </div>

      <div className="text-center text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/iniciar-sesion"
          className="font-semibold hover:text-zinc-700 hover:underline"
        >
          Inicia sesión
        </Link>
      </div>

      <div className="flex items-center justify-center text-sm mt-4">
        <Link
          href="/"
          className="font-semibold text-zinc-600 flex items-center hover:text-zinc-500 cursor-pointer select-none"
        >
          <GoHome className="mr-2 h-4 w-4" />
          Inicio
        </Link>
      </div>
    </form>
  );
}
