// types.ts (puedes extraer los tipos si lo deseas en otro archivo)
import { ReactNode } from "react";

interface Metadata {
  title: string;
  description: string;
  keywords: string[];
}

interface RootLayoutProps {
  children: ReactNode;
}

// metadata.tsx
export const metadata: Metadata = {
  title: "Iniciar Sesión | BarberShop",
  description:
    "Inicia sesión en Seventwo para acceder a tu cuenta y disfrutar de todas las funcionalidades.",
  keywords: [
    "Iniciar sesión",
    "Seventwo",
    "Acceso a cuenta",
    "Inicio de sesión",
    "Plataforma de gestión",
  ],
};

// layout.tsx
export default function RootLayout({ children }: RootLayoutProps) {
  return <div>{children}</div>;
}
