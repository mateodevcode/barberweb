"use client";

import { ContextApp } from "@/context/ContextApp";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const { usuario } = useContext(ContextApp);

  return (
    <div className="w-full h-20 flex items-center justify-center">
      <div className="w-10/12 flex items-center justify-between">
        <Image
          src="/logo/logo-bs.png"
          alt="Logo"
          width={100}
          height={100}
          priority
          className="object-cover w-16 md:w-20 h-8 md:h-10"
        />
        {usuario ? (
          <Link
            href="/cuenta"
            className="flex items-center space-x-1 select-none"
          >
            <Image
              src={usuario?.image || ""}
              alt="User Image"
              width={100}
              height={100}
              priority
              className="object-cover w-10 h-10 rounded-full"
            />
          </Link>
        ) : (
          <Link
            href="/iniciar-sesion"
            className="flex items-center space-x-1 select-none"
          >
            <BsPersonCircle className="text-2xl md:text-3xl text-black cursor-pointer hover:text-zinc-700" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
