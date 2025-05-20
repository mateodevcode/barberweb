export function obtenerFechaISO(dia: string, mes: string): string {
  const meses: Record<string, number> = {
    enero: 1,
    febrero: 2,
    marzo: 3,
    abril: 4,
    mayo: 5,
    junio: 6,
    julio: 7,
    agosto: 8,
    septiembre: 9,
    octubre: 10,
    noviembre: 11,
    diciembre: 12,
  };

  const mesNumero = meses[mes.toLowerCase()];
  const hoy = new Date();
  const año = hoy.getFullYear();

  const fechaISO = `${año}-${String(mesNumero).padStart(2, "0")}-${String(
    dia
  ).padStart(2, "0")}`;
  return fechaISO;
}
