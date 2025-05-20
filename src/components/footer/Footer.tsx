"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { GoHome } from "react-icons/go";
import { HiMenu } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlinePerson } from "react-icons/md";

const Footer = () => {
  const router = useRouter();
  return (
    <div className="w-full h-14 bg-zinc-900 fixed bottom-0 md:hidden items-center justify-center flex z-20">
      <div className="w-11/12 flex items-center justify-between">
        <div className="mx-2" onClick={() => router.push("/")}>
          <GoHome className="text-2xl hover:text-zinc-400 text-white cursor-pointer select-none" />
        </div>
        <div className="mx-2">
          <MdOutlinePerson className="text-2xl hover:text-zinc-400 text-white cursor-pointer select-none" />
        </div>
        <div className="mx-2" onClick={() => router.push("/reservar-cita")}>
          <IoDocumentTextOutline className="text-2xl hover:text-zinc-400 text-white cursor-pointer select-none" />
        </div>
        <div className="mx-2">
          <HiMenu className="text-2xl hover:text-zinc-400 text-white cursor-pointer select-none" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
