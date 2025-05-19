type Hora = { hora: string };

function generarHoras(inicio: number, fin: number): Hora[] {
  const horas: Hora[] = [];
  for (let i = inicio; i < fin; i++) {
    const horaFormateada = i.toString().padStart(2, "0") + ":00";
    horas.push({ hora: horaFormateada });
  }
  return horas;
}

export const horasTrabajo: Hora[] = [
  ...generarHoras(9, 13),  // 09:00 - 12:00
  ...generarHoras(15, 22), // 15:00 - 21:00
];