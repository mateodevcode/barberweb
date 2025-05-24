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
          priority
          className="rounded-xl max-h-[500px] object-cover"
        />
        <h3 className="text-2xl md:text-4xl font-bold text-white absolute bottom-4 md:bottom-16  md:left-16 left-4 z-10">
          <span className="text-3xl md:text-5xl font-bold block">
            Reserva tu cita
          </span>
          <button
            className="text-sm md:text-base font-semibold bg-white text-black px-4 py-2 rounded-full mt-2 active:scale-95 transition cursor-pointer select-none hover:bg-white/80"
            onClick={() => router.push("/reservar-cita")}
          >
            Reservar Ahora
          </button>
        </h3>
        <div className="absolute bottom-0 left-0 w-full h-56 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
      </div>
    </div>
  );
};

export default BannerReserva;
