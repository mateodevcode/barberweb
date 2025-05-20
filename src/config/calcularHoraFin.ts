export function calcularHoraFin(horaInicio: string, duracion: number): string {
  if (!horaInicio || !duracion) {
    return "";
  }

  if (typeof duracion !== "number") {
    return "";
  }
  if (duracion < 0) {
    return "";
  }

  const [h, m] = horaInicio.split(":").map(Number);
  const date = new Date();
  date.setHours(h, m + duracion); // Suma 15 minutos
  const hh = date.getHours().toString().padStart(2, "0");
  const mm = date.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
}
