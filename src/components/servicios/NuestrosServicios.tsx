"use client";

import { servicios } from "@/data/servicios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BiPlus } from "react-icons/bi";

const NuestrosServicios = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-center mt-8">
      <div className="w-10/12">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-2xl font-bold mb-4">Nuestros Servicios</h3>
        </div>
        <div className="flex flex-row items-center space-x-2 overflow-auto w-full justify-start py-5">
          {servicios.map((servicio, index) => (
            <div
              className="bg-white flex flex-col items-center justify-center min-w-[150px] h-36 rounded-xl shadow-lg space-y-1.5 p-4 cursor-pointer hover:bg-zinc-200 transition duration-300"
              key={index}
              onClick={() => {
                router.push("/reservar-cita?servicio=" + servicio.nombre);
              }}
            >
              <div className="flex items-center justify-center space-x-1">
                {servicio.icon && (servicio.icon as React.ReactNode)}
                {servicio.imagen && servicio.icon && (
                  <BiPlus className="text-xl" />
                )}
                {servicio.imagen && (
                  <Image
                    src={servicio.imagen}
                    alt={servicio.nombre}
                    width={100}
                    height={100}
                    className="w-10"
                  />
                )}
              </div>
              <h4 className="font-semibold text-sm text-center leading-4.5">
                {servicio.nombre}
              </h4>
              <p className="text-base text-zinc-700">$ {servicio.precio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NuestrosServicios;
