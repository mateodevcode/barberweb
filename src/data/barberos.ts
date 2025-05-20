export interface Barbero {
  id?: string;
  nombre: string;
  imagen: string;
  telefono?: string;
}

export const barberos: Barbero[] = [
  {
    nombre: "Sergio",
    imagen: "/barberos/sergio.jpg",
  },
  {
    nombre: "Anoy",
    imagen: "/barberos/anoy.jpg",
  },
  {
    nombre: "Martin",
    imagen: "/barberos/martin.jpg",
  },
  {
    nombre: "Criag",
    imagen: "/barberos/criag.jpg",
  },
];
