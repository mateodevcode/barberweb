import { DiaSemana } from "@/config/obtenerDosLetras";

interface Meses {
    mes: string;
    dias: {
        nombre: DiaSemana;
        dia: number;
    }[];
}

export const meses: Meses[] = [
  {
    mes: 'junio',
    dias: [
      { nombre: 'domingo', dia: 1 },
      { nombre: 'lunes', dia: 2 },
      { nombre: 'martes', dia: 3 },
      { nombre: 'miércoles', dia: 4 },
      { nombre: 'jueves', dia: 5 },
      { nombre: 'viernes', dia: 6 },
      { nombre: 'sábado', dia: 7 },
      { nombre: 'domingo', dia: 8 },
      { nombre: 'lunes', dia: 9 },
      { nombre: 'martes', dia: 10 },
      { nombre: 'miércoles', dia: 11 },
      { nombre: 'jueves', dia: 12 },
      { nombre: 'viernes', dia: 13 },
      { nombre: 'sábado', dia: 14 },
      { nombre: 'domingo', dia: 15 },
      { nombre: 'lunes', dia: 16 },
      { nombre: 'martes', dia: 17 },
      { nombre: 'miércoles', dia: 18 },
      { nombre: 'jueves', dia: 19 },
      { nombre: 'viernes', dia: 20 },
      { nombre: 'sábado', dia: 21 },
      { nombre: 'domingo', dia: 22 },
      { nombre: 'lunes', dia: 23 },
      { nombre: 'martes', dia: 24 },
      { nombre: 'miércoles', dia: 25 },
      { nombre: 'jueves', dia: 26 },
      { nombre: 'viernes', dia: 27 },
      { nombre: 'sábado', dia: 28 },
      { nombre: 'domingo', dia: 29 },
      { nombre: 'lunes', dia: 30 },
    ],
  },
];

export const mesesSinDomingo = meses.map((mes) => ({
  ...mes,
  dias: mes.dias.filter((dia) => dia.nombre.toLowerCase() !== "domingo"),
}));
