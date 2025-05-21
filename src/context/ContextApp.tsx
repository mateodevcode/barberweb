"use client";

import { Barbero } from "@/data/barberos";
import { Cita } from "@/data/citas";
import { Servicio } from "@/data/servicios";
import { createContext, useEffect, useState } from "react";

interface ContextAppProps {
  children: React.ReactNode;
}

const defaultValues = {
  //   isOpen: false,
  //   setIsOpen: (value: boolean) => {},
  loading: true,
  citas: [] as Cita[],
  servicios: [] as Servicio[],
  barberos: [] as Barbero[],
};

export const ContextApp = createContext(defaultValues);

export const ContextAppProvider = ({ children }: ContextAppProps) => {
  const [loading, setLoading] = useState(true);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [barberos, setBarberos] = useState<Barbero[]>([]);

  useEffect(() => {
    // Cargar los datos de las citas, servicios y barberos
    const fetchBarberos = async () => {
      const res = await fetch("/api/barberos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setBarberos(data);
      setLoading(false);
    };
    fetchBarberos();

    const fetchServicios = async () => {
      const res = await fetch("/api/servicios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setServicios(data);
      setLoading(false);
    };
    fetchServicios();

    const fetchCitas = async () => {
      const res = await fetch("/api/citas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCitas(data);
      setLoading(false);
    };
    fetchCitas();
  }, []);

  return (
    <ContextApp.Provider
      value={{
        citas,
        loading,
        servicios,
        barberos,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
