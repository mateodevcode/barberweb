type Hora = { hora: string };

function generarBloquesDe15Minutos(inicio: number, fin: number): Hora[] {
  const bloques: Hora[] = [];
  for (let h = inicio; h < fin; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hora = h.toString().padStart(2, "0");
      const minuto = m.toString().padStart(2, "0");
      bloques.push({ hora: `${hora}:${minuto}` });
    }
  }
  return bloques;
}

export const bloquesTrabajo: Hora[] = [
  ...generarBloquesDe15Minutos(9, 13), // 09:00 - 12:45
  ...generarBloquesDe15Minutos(15, 22), // 15:00 - 21:45
];
