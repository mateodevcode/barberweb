import React from "react";

const Productos = () => {
  return (
    <div className="w-full flex items-center justify-center mt-8">
      <div className="w-10/12">
        <div className="flex flex-row items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Productos</h2>
          <span className="text-zinc-500 cursor-pointer">Ver todos</span>
        </div>
        <div className="flex flex-row items-center space-x-2 overflow-auto w-full justify-start py-5">
          <div className="min-w-[150px] md:w-[250px] h-48 md:h-80 bg-white flex items-center justify-center cursor-pointer rounded-lg shadow-lg">
            Productos
          </div>
          <div className="min-w-[150px] md:w-[250px] h-48 md:h-80 bg-white flex items-center justify-center cursor-pointer rounded-lg shadow-lg">
            Productos
          </div>
          <div className="min-w-[150px] md:w-[250px] h-48 md:h-80 bg-white flex items-center justify-center cursor-pointer rounded-lg shadow-lg">
            Productos
          </div>
          <div className="min-w-[150px] md:w-[250px] h-48 md:h-80 bg-white flex items-center justify-center cursor-pointer rounded-lg shadow-lg">
            Productos
          </div>
          <div className="min-w-[150px] md:w-[250px] h-48 md:h-80 bg-white flex items-center justify-center cursor-pointer rounded-lg shadow-lg">
            Productos
          </div>
          <div className="min-w-[150px] md:w-[250px] h-48 md:h-80 bg-white flex items-center justify-center cursor-pointer rounded-lg shadow-lg">
            Productos
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
