import BannerPublicidad from "@/components/banner/BannerPublicidad";
import BannerReserva from "@/components/banner/BannerReserva";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Productos from "@/components/productos/Productos";
import NuestrosServicios from "@/components/servicios/NuestrosServicios";
import React from "react";

const page = () => {
  return (
    <div className="bg-zinc-100">
      <Navbar />
      <BannerReserva />
      <NuestrosServicios />
      <Productos />
      <BannerPublicidad />
      <Footer />
    </div>
  );
};

export default page;
