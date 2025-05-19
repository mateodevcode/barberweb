"use client";

import React, { useState } from "react";
import { completarDia } from "@/config/completarDia";
import { horasTrabajo } from "@/config/horas";
import { obtenerDosLetras } from "@/config/obtenerDosLetras";
import { barberos } from "@/data/barberos";
import { meses, mesesSinDomingo } from "@/data/meses";
import Image from "next/image";
import { servicios } from "@/data/servicios";
import { BiPlus } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { FaCircleCheck } from "react-icons/fa6";

const ReservarCita = () => {
  const searchParams = useSearchParams();
  const servicioParam = searchParams.get("servicio");

  const [formData, setFormData] = useState({
    dia: "",
    mes: "",
    servicio: servicioParam ? servicioParam : "",
    barbero: "",
    hora: "",
  });
  const [citaConfirmada, setCitaConfirmada] = useState(false);

  return (
    <>
      <div className="w-full flex items-center justify-center bg-zinc-100 pt-4 pb-10">
        <div className="w-10/12 flex flex-col items-start justify-center">
          <h2 className="text-2xl font-bold mb-4">Reservar Cita</h2>
          <div className="flex flex-row items-center justify-between w-full">
            <h2 className="text-xl font-bold">Seleccionar el día</h2>
            <span className="text-zinc-500 text-sm font-semibold">
              {meses[0].mes}
            </span>
          </div>
          <div className="flex flex-row items-center space-x-2 overflow-auto w-full justify-start py-5">
            {mesesSinDomingo.map((mes) => (
              <React.Fragment key={mes.mes}>
                {mes.dias.map((dia, index) => (
                  <div
                    className={`min-w-[70px] min-h-[100px] bg-white hover:bg-zinc-200 flex items-center justify-center cursor-pointer rounded-lg shadow-lg flex-col ${
                      String(dia.dia) === formData.dia ? "bg-zinc-200" : ""
                    }`}
                    id={String(dia.dia)}
                    key={index}
                    onClick={(e) => {
                      setFormData({
                        ...formData,
                        dia: e.currentTarget.id,
                        mes: mes.mes,
                      });
                    }}
                  >
                    <span className="font-semibold">
                      {obtenerDosLetras(dia.nombre)}
                    </span>
                    <span className="text-zinc-500">
                      {completarDia(dia.dia)}
                    </span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <h2 className="text-xl font-bold">Selecciona un servicio</h2>
          </div>
          <div className="flex flex-row items-center space-x-2 overflow-auto w-full justify-start py-5">
            {servicios.map((servicio, index) => (
              <div
                className={`bg-white flex flex-col items-center justify-center min-w-[150px] h-36 rounded-xl shadow-lg space-y-1.5 p-4 cursor-pointer hover:bg-zinc-200 transition duration-300 ${
                  String(servicio.nombre) === formData.servicio
                    ? "bg-zinc-200"
                    : ""
                }`}
                key={index}
                id={String(servicio.nombre)}
                onClick={(e) => {
                  setFormData({
                    ...formData,
                    servicio: e.currentTarget.id,
                  });
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
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <h2 className="text-xl font-bold">Selecciona tu barbero</h2>
          </div>
          <div className="flex flex-row items-center space-x-2 overflow-auto w-full justify-start py-5">
            {barberos.map((barbero, index) => (
              <div
                key={index}
                id={String(barbero.nombre)}
                onClick={(e) => {
                  setFormData({
                    ...formData,
                    barbero: e.currentTarget.id,
                  });
                }}
                className={`min-w-[100px] min-h-[100px] bg-white hover:bg-zinc-200 flex items-center justify-center cursor-pointer rounded-lg shadow-lg flex-col space-y-1 ${
                  String(barbero.nombre) === formData.barbero
                    ? "bg-zinc-200"
                    : ""
                }`}
              >
                <Image
                  src={barbero.imagen}
                  alt={barbero.nombre}
                  width={200}
                  height={200}
                  className="rounded-full w-14"
                />
                <span className="font-semibold text-sm">{barbero.nombre}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <h2 className="text-xl font-bold">Selecciona la hora</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {horasTrabajo.map((hora, index) => (
              <div
                key={index}
                id={String(hora.hora)}
                onClick={(e) => {
                  setFormData({
                    ...formData,
                    hora: e.currentTarget.id,
                  });
                }}
                className={`min-w-[100px] min-h-[40px] bg-white hover:bg-zinc-200 flex items-center justify-center cursor-pointer rounded-lg shadow-lg flex-col space-y-1 ${
                  String(hora.hora) === formData.hora ? "bg-zinc-200" : ""
                }`}
              >
                <span className="text-sm">{hora.hora}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center w-full justify-center my-10">
            <button
              className="bg-black text-white px-4 py-2 rounded-lg shadow-lg hover:bg-zinc-800 transition duration-300 cursor-pointer select-none"
              onClick={() => {
                setCitaConfirmada(true);
              }}
            >
              Confirmar reserva
            </button>
          </div>
        </div>
      </div>

      {citaConfirmada && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-10/12 mx-auto flex items-center justify-center">
            <div className="flex flex-col items-center justify-center bg-green-100 rounded-lg shadow-lg p-8 space-y-2">
              <FaCircleCheck className="text-green-600 text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                Cita confirmada
              </h3>
              <span className="text-base text-center text-green-600">
                Tu cita ha sido confirmada para el{" "}
                <strong>{formData.dia}</strong> de{" "}
                <strong>{formData.mes}</strong> a las{" "}
                <strong>{formData.hora} </strong>
                con
                <strong> {formData.barbero}</strong> para el servicio de
                <strong> {formData.servicio}</strong>.
              </span>
              <button
                className="bg-black text-white px-4 py-2 rounded-lg shadow-lg hover:bg-zinc-800 transition duration-300 cursor-pointer select-none mt-4"
                onClick={() => {
                  setCitaConfirmada(false);
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservarCita;
