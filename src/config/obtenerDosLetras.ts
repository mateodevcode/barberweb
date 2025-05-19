export type DiaSemana = 'domingo' | 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado';

interface Dias {
    domingo: string;
    lunes: string;
    martes: string;
    miércoles: string;
    jueves: string;
    viernes: string;
    sábado: string;
}


export const obtenerDosLetras = (dia: DiaSemana) => {
  const dias: Dias = {
    domingo: "Do",
    lunes: "Lu",
    martes: "Ma",
    miércoles: "Mi",
    jueves: "Ju",
    viernes: "Vi",
    sábado: "Sa",
  };

  return dias[dia]
}