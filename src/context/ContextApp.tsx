"use client";

import { getUser } from "@/auth/server";
import { Barbero } from "@/data/barberos";
import { Cita } from "@/data/citas";
import { Servicio } from "@/data/servicios";
// import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface ContextAppValue {
  router: ReturnType<typeof useRouter>;
  loading: boolean;
  citas: Cita[];
  servicios: Servicio[];
  barberos: Barbero[];
  usuario: Usuario | null;
  setIdUser: (id: idUser) => void;
  user: User;
}

interface Usuario {
  id: string;
  email: string;
  name: string;
  image?: string;
}

type idUser = string | null;

const defaultValues: ContextAppValue = {
  router: {} as ReturnType<typeof useRouter>,
  loading: true,
  citas: [],
  servicios: [],
  barberos: [],
  usuario: null,
  setIdUser: () => "",
  user: {} as User,
};

export const ContextApp = createContext<ContextAppValue>(defaultValues);

export const ContextAppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [barberos, setBarberos] = useState<Barbero[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [user, setUser] = useState<User>({} as User);
  const [idUser, setIdUser] = useState<idUser>(null);

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

    const fetcUsuaros = async () => {
      const res = await fetch("/api/usuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUsuarios(data);
      setLoading(false);
    };
    fetcUsuaros();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      // console.log(user);
      if (!user) {
        setLoading(false);
        return;
      } else {
        setUser(user);
        setIdUser(user.id);
        const usuario = usuarios.find((u) => u.id === idUser);
        if (usuario === undefined) {
          return;
        } else {
          setUsuario(usuario);
        }
        setLoading(false);
      }
    };

    fetchUser();
  }, [idUser, usuarios]);

  return (
    <ContextApp.Provider
      value={{
        citas,
        loading,
        servicios,
        barberos,
        router,
        usuario,
        setIdUser,
        user,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
