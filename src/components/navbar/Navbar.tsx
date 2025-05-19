import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="w-full h-20 flex items-center justify-center">
      <div className="w-10/12 flex items-center justify-between">
        <Image
          src="/logo/logo-bs.png"
          alt="Logo"
          width={400}
          height={400}
          className="object-cover w-16 md:w-24 h-auto cursor-pointer"
        />
        <BsPersonCircle className="text-2xl md:text-3xl text-black cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
