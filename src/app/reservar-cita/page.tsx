import Footer from "@/components/footer/Footer";
import ReservarCita from "@/components/reservar-cita/ReservarCita";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ReservarCita />
      <Footer />
    </Suspense>
  );
}
