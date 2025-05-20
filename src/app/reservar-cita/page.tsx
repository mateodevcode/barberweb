import Loading from "@/components/loading/Loading";
import ReservarCita from "@/components/reservar-cita/ReservarCita";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ReservarCita />
    </Suspense>
  );
}
