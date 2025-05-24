"use client";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const IniciarTour = () => {
  const driverObj = driver({
    showProgress: true,
    showButtons: ["next", "previous"],
    nextBtnText: "Siguiente",
    prevBtnText: "Anterior",
    doneBtnText: "Listo",
    steps: [
      {
        element: "#sss",
        popover: {
          title: "Perfecto! Ya estás aquí",
          description: "Vamos a guiarte para que puedas solicitar tu cita.",
          side: "left",
          align: "start",
        },
      },
      {
        element: ".card-dia",
        popover: {
          title: "Selecciona el día",
          description:
            "Selecciona el día que necesitas para solicitar la cita.",
          side: "left",
          align: "start",
        },
      },
      {
        element: ".card-servicio:nth-child(2)",
        popover: {
          title: "Selecciona el servicio",
          description:
            "Selecciona el servicio que necesitas para solicitar la cita, tenemos Corte de cabello, Barba y Corte de cabello + Barba.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: ".card-barbero:nth-child(3)",
        popover: {
          title: "Selecciona tu barbero favorito",
          description:
            "Puedes seleccionar el barbero que más te guste, y consultar su disponibilidad.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: ".card-hora:nth-child(5)",
        popover: {
          title: "Elige la hora",
          description:
            "Elige la hora que más te convenga para tu cita. verifica que el barbero esté disponible. \n\nRecuerda que cada servicio tiene una duración diferente.",
          side: "top",
          align: "start",
        },
      },
      {
        element: ".card-contacto",
        popover: {
          title: "Ingresa tus datos",
          description:
            "Ahora solo nos falta que ingreses tu nombre y un número de contacto para poder confirmar tu cita.",
          side: "top",
          align: "start",
        },
      },
      {
        element: ".card-confirmar",
        popover: {
          title: "Confirma tu cita",
          description: "por ultimo solo debes confirmar tu cita, y listo.",
          side: "top",
          align: "start",
        },
      },
    ],
  });

  return (
    <button
      onClick={() => driverObj.drive()}
      className="text-xs text-zinc-700 font-semibold hover:text-zinc-400 hover:underline active:scale-95 transform duration-75 cursor-pointer select-none"
    >
      Iniciar Tour
    </button>
  );
};

export default IniciarTour;
