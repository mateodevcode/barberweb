import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
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
        <BsPersonCircle className="text-2xl md:text-3xl text-black cursor-pointer hover:text-zinc-700" />
      </div>
    </div>
  );
};

export default Navbar;
