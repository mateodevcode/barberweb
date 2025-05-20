export interface Servicio {
  id: string;
  nombre: string;
  precio: number;
  duracion: number;
}

export const servicios: Servicio[] = [
  {
    id: "1",
    nombre: "Corte de cabello",
    precio: 15,
    duracion: 30,
  },
  {
    id: "2",
    nombre: "Barba",
    precio: 10,
    duracion: 20,
  },
  {
    id: "3",
    nombre: "Corte y Barba",
    precio: 20,
    duracion: 50,
  },
];
