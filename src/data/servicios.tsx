import { IoMdCut } from "react-icons/io";

interface Servicio {
  nombre: string;
  precio: number;
  duracion: number;
  icon: React.ReactElement | null;
  imagen: string | null;
}

export const servicios: Servicio[] = [
  {
    nombre: "Corte de cabello",
    precio: 15,
    duracion: 30,
    icon: <IoMdCut className="text-2xl" />,
    imagen: null,
  },
  {
    nombre: "Barba",
    precio: 10,
    duracion: 20,
    icon: null,
    imagen: "/icon/bigote.png",
  },
  {
    nombre: "Corte y Barba",
    precio: 20,
    duracion: 50,
    icon: <IoMdCut className="text-2xl" />,
    imagen: "/icon/bigote.png",
  },
];
