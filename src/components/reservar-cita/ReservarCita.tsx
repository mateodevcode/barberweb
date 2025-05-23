"use client";

import React, { useContext, useEffect, useState } from "react";
import { completarDia } from "@/config/completarDia";
import { obtenerDosLetras } from "@/config/obtenerDosLetras";
import { meses, mesesSinDomingo } from "@/data/meses";
import Image from "next/image";
import { BiPlus } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { FaCircleCheck } from "react-icons/fa6";
import { supabase } from "@/lib/supabaseClient";
import { IoMdCut } from "react-icons/io";
import Loading from "../loading/Loading";
import Footer from "../footer/Footer";
import { bloquesTrabajo } from "@/config/horas";
import { obtenerFechaISO } from "@/config/obtenerFechaISO";
import { calcularHoraFin } from "@/config/calcularHoraFin";
import { toast } from "sonner";
import { ContextApp } from "@/context/ContextApp";
import IniciarTour from "../guia/IniciarTour";

const ReservarCita = () => {
  const searchParams = useSearchParams();
  const servicioParam = searchParams.get("servicio");
  const { barberos, servicios, citas, loading } = useContext(ContextApp);
  const [Dia, setDia] = useState("");
  const [duracion, setDuracion] = useState(0);
  const [citaConfirmada, setCitaConfirmada] = useState(false);

  useEffect(() => {
    if (servicioParam) {
      const servicioEncontrado = servicios.find(
        (servicio) => servicio.id === servicioParam
      );
      if (servicioEncontrado) {
        setDuracion(servicioEncontrado.duracion);
      }
    }
  }, [servicioParam, servicios]);

  type Horas = {
    hora: string;
  };

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    servicio: servicioParam ? servicioParam : "",
    fecha: "",
    barbero: "",
    hora_inicio: "",
    hora_fin: "",
    estado: "confirmada",
  });

  function estaHoraOcupada(horaFin: string, horasOcupadas: Horas[]): boolean {
    return horasOcupadas.some((bloque) => bloque.hora === horaFin);
  }

  function formatearHora(hora: string): string {
    return hora.slice(0, 5); // "09:00:00" -> "09:00"
  }
  const citasDelBarbero = citas.filter(
    (cita) =>
      cita.barberos_id === formData.barbero && cita.fecha === formData.fecha
  );
  const horasOcupadas = bloquesTrabajo.filter((bloque) => {
    return citasDelBarbero.some((cita) => {
      const inicio = formatearHora(cita.hora_inicio);
      const fin = formatearHora(cita.hora_fin);
      return (
        inicio === bloque.hora || (fin >= bloque.hora && inicio <= bloque.hora)
      );
    });
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.telefono ||
      !formData.servicio ||
      !formData.fecha ||
      !formData.barbero ||
      !formData.hora_inicio ||
      !formData.hora_fin
    ) {
      toast.error("Por favor, completa todos los campos.", {
        position: "top-right",
      });
      setCitaConfirmada(false);
      return;
    }

    const cita = {
      cliente_nombre: formData.nombre,
      cliente_telefono: formData.telefono,
      servicios_id: formData.servicio,
      barberos_id: formData.barbero,
      hora_inicio: formData.hora_inicio,
      hora_fin: formData.hora_fin,
      fecha: formData.fecha,
      estado: "confirmada",
    };

    const { data, error } = await supabase.from("citas").insert([cita]);

    if (error) {
      console.error("❌ Error al guardar la cita:", error.message);
    } else {
      console.log("✅ Cita guardada correctamente:", data);
      setCitaConfirmada(true);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full flex items-center justify-center bg-zinc-100 pt-4 pb-10">
        <div className="w-10/12 flex flex-col items-start justify-center">
          <div className="flex flex-row items-center justify-between w-full">
            <h2 className="text-2xl font-bold mb-4">Reservar Cita</h2>
            <IniciarTour />
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <h2 className="text-xl font-bold">Seleccionar el día</h2>
            <span className="text-zinc-500 text-sm font-semibold">
              {meses[0].mes}
            </span>
          </div>
          <div
            className="flex flex-row items-center space-x-2 overflow-auto w-full justify-start py-5"
            id="div-dia"
          >
            {mesesSinDomingo.map((mes) => (
              <React.Fragment key={mes.mes}>
                {mes.dias.map((dia, index) => (
                  <div
                    className={`min-w-[70px] min-h-[100px] bg-white hover:bg-zinc-200 flex items-center justify-center rounded-lg shadow-lg flex-col card-dia transition active:scale-95 transform duration-75 cursor-pointer select-none ${
                      String(dia.dia) === Dia ? "bg-zinc-200" : ""
                    }`}
                    id={String(dia.dia)}
                    key={index}
                    onClick={(e) => {
                      setDia(e.currentTarget.id);
                      setFormData({
                        ...formData,
                        fecha: obtenerFechaISO(e.currentTarget.id, mes.mes),
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
                className={`relative bg-white flex flex-col items-center justify-center min-w-[150px] h-36 rounded-xl shadow-lg space-y-1.5 p-4  hover:bg-zinc-200 active:scale-95 transform duration-75 cursor-pointer select-none card-servicio ${
                  String(servicio.id) === formData.servicio ? "bg-zinc-200" : ""
                }`}
                key={index}
                id={String(servicio.id)}
                onClick={(e) => {
                  setDuracion(servicio.duracion);
                  setFormData({
                    ...formData,
                    servicio: e.currentTarget.id,
                  });
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
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <h2 className="text-xl font-bold">Selecciona tu barbero</h2>
          </div>
          <div className="flex flex-row items-center space-x-2 overflow-auto w-full justify-start py-5">
            {barberos.map((barbero, index) => (
              <div
                key={index}
                id={String(barbero.id)}
                onClick={(e) => {
                  setFormData({
                    ...formData,
                    barbero: e.currentTarget.id,
                  });
                }}
                className={`min-w-[100px] min-h-[100px] bg-white hover:bg-zinc-200 flex items-center justify-center rounded-lg shadow-lg flex-col space-y-1 card-barbero active:scale-95 transform duration-75 cursor-pointer select-none ${
                  String(barbero.id) === formData.barbero ? "bg-zinc-200" : ""
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
            {bloquesTrabajo.map((hora, index) => (
              <div
                key={index}
                id={String(hora.hora)}
                onClick={(e) => {
                  if (!Dia) {
                    toast.error("Por favor, selecciona un día primero", {
                      position: "top-right",
                    });
                    return;
                  }
                  if (!duracion) {
                    toast.error("Por favor, selecciona un servicio primero.", {
                      position: "top-right",
                    });
                    return;
                  }
                  if (!formData.barbero) {
                    toast.error("Por favor, selecciona un barbero primero.", {
                      position: "top-right",
                    });
                    return;
                  }

                  if (
                    horasOcupadas.some(
                      (bloque) => bloque.hora === e.currentTarget.id
                    )
                  ) {
                    toast.error(
                      "Hora ocupada. Por favor, selecciona otra hora.",
                      {
                        position: "top-right",
                      }
                    );
                    setCitaConfirmada(false);
                    setFormData({
                      ...formData,
                      hora_inicio: "",
                    });
                    return;
                  }
                  if (
                    estaHoraOcupada(
                      calcularHoraFin(e.currentTarget.id, duracion),
                      horasOcupadas
                    )
                  ) {
                    toast.error(
                      "El servicio seleccionado requiere más tiempo. intenta con 15 minutos antes.",
                      {
                        position: "top-right",
                      }
                    );
                    setCitaConfirmada(false);
                    setFormData({
                      ...formData,
                      hora_inicio: "",
                    });
                    return;
                  }
                  setFormData({
                    ...formData,
                    hora_inicio: e.currentTarget.id,
                    hora_fin: calcularHoraFin(e.currentTarget.id, duracion),
                  });
                }}
                className={`min-w-[100px] min-h-[40px] flex items-center justify-center rounded-lg shadow-lg flex-col space-y-1 active:scale-95 transform duration-75 cursor-pointer select-none card-hora ${
                  horasOcupadas.some((bloque) => bloque.hora === hora.hora)
                    ? "bg-red-600 cursor-not-allowed text-white"
                    : String(hora.hora) === formData.hora_inicio
                    ? "bg-green-600 text-white cursor-pointer"
                    : "bg-white hover:bg-zinc-200 cursor-pointer"
                }`}
              >
                <span className="text-sm">{hora.hora}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <h2 className="text-xl font-bold">Datos del cliente</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 w-full card-contacto">
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  nombre: e.target.value,
                });
              }}
              className="text-sm p-2 px-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-full"
            />
            <input
              type="text"
              placeholder="Ingresa tu telefono"
              name="telefono"
              id="telefono"
              value={formData.telefono}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  telefono: e.target.value,
                });
              }}
              className="text-sm p-2 px-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-full"
            />
          </div>
          <div className="flex items-center w-full justify-center my-10">
            <button
              className="bg-black text-white px-4 py-2 rounded-lg shadow-lg hover:bg-zinc-800 transition duration-300 card-confirmar active:scale-95 transform cursor-pointer select-none"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Confirmar reserva
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {/* Modal de confirmación */}
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
                <strong>{formData?.fecha}</strong>
                con
                <strong>
                  {" "}
                  {
                    barberos.filter(
                      (barbero) => barbero.id === formData?.barbero
                    )[0].nombre
                  }
                </strong>{" "}
                para el servicio de
                <strong>
                  {" "}
                  {
                    servicios.filter(
                      (servicio) => servicio.id === formData?.servicio
                    )[0].nombre
                  }
                </strong>
                .
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
