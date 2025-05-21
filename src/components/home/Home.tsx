"use client";

import BannerPublicidad from "@/components/banner/BannerPublicidad";
import BannerReserva from "@/components/banner/BannerReserva";
import Footer from "@/components/footer/Footer";
import Loading from "@/components/loading/Loading";
import Navbar from "@/components/navbar/Navbar";
import Productos from "@/components/productos/Productos";
import NuestrosServicios from "@/components/servicios/NuestrosServicios";
import { ContextApp } from "@/context/ContextApp";
import React, { useContext } from "react";

const Home = () => {
  const { loading } = useContext(ContextApp);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-zinc-100 relative">
      <Navbar />
      <BannerReserva />
      <NuestrosServicios />
      <Productos />
      <BannerPublicidad />
      <Footer />
    </div>
  );
};

export default Home;
