import Image from "next/image";
import Link from "next/link";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white z-40">
      <div>
        <Image
          src="/logo/logo-bs.png"
          alt="Loading"
          width={100}
          height={100}
          priority
          className="object-cover w-24 md:w-32 h-12 md:h-16"
        />
      </div>
      <h2 className="absolute text-gray-500 bottom-2 text-xs">
        Desarrollado por{" "}
        <Link href="https://seventwo.tech" target="_blank">
          <strong>Seventwo</strong>
        </Link>
      </h2>
    </div>
  );
};

export default Loading;
