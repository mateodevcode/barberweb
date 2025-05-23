"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { BiPlus } from "react-icons/bi";
import { IoMdCut } from "react-icons/io";
import { ContextApp } from "@/context/ContextApp";

const NuestrosServicios = () => {
  const router = useRouter();
  const { servicios } = useContext(ContextApp);

  return (
    <div className="w-full flex items-center justify-center mt-8">
      <div className="w-10/12">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-2xl font-bold mb-4">Nuestros Servicios</h3>
        </div>
        <div className="flex flex-row items-center space-x-2 overflow-auto w-full justify-start py-5">
          {servicios.map((servicio, index) => (
            <div
              className={`relative bg-white flex flex-col items-center justify-center min-w-[150px] h-36 rounded-xl shadow-lg space-y-1.5 p-4 hover:bg-zinc-200 active:scale-95 transition cursor-pointer select-none`}
              key={index}
              id={String(servicio.id)}
              onClick={() => {
                router.push("/reservar-cita" + `?servicio=${servicio.id}`);
              }}
            >
              <div className="flex items-center justify-center space-x-1">
                {servicio.nombre === "Corte de cabello" && (
                  <IoMdCut className="text-2xl" />
                )}
                {servicio.nombre === "Corte y Barba" && (
                  <>
                    <IoMdCut className="text-2xl" />
                    <BiPlus className="text-xl" />
                    <Image
                      src={"/icon/bigote.png"}
                      alt={"Barba"}
                      width={100}
                      height={100}
                      className="w-10"
                    />
                  </>
                )}
                {servicio.nombre === "Barba" && (
                  <Image
                    src={"/icon/bigote.png"}
                    alt={"Barba"}
                    width={100}
                    height={100}
                    className="w-10"
                  />
                )}
              </div>
              <h4 className="font-semibold text-sm text-center leading-4.5">
                {servicio.nombre}
              </h4>
              <span className="text-base text-zinc-700">
                $ {servicio.precio}
              </span>
              <span className="text-black text-xs font-semibold absolute bottom-2 opacity-20">
                Aprox. ({servicio.duracion} min)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NuestrosServicios;
