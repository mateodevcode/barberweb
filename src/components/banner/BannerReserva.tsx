"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BannerReserva = () => {
  const router = useRouter();

  return (
    <div className="w-full h-52 md:h-full flex items-center justify-center mt-4">
      <div className="w-10/12 h-full flex items-center justify-center relative">
        <Image
          src="/banner/fondo.png"
          alt="Banner de Reserva"
          width={1920}
          height={1080}
          className="rounded-xl h-full object-cover"
        />
        <h3 className="text-2xl md:text-4xl font-bold text-white absolute bottom-4 md:bottom-16  md:left-16 left-4">
          <span className="text-3xl md:text-5xl font-bold block">
            Reserva tu cita
          </span>
          <button
            className="text-sm md:text-base font-semibold bg-white text-black px-4 py-2 rounded-full mt-2 cursor-pointer select-none hover:bg-white/80"
            onClick={() => router.push("/reservar-cita")}
          >
            Reservar Ahora
          </button>
        </h3>
      </div>
    </div>
  );
};

export default BannerReserva;
