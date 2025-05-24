import { icon_seventwo } from "@/data/logo";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-1 select-none">
      <Image
        src={icon_seventwo.src}
        alt={icon_seventwo.alt}
        width={100}
        height={100}
        priority
        className="object-cover w-16 md:w-20 h-8 md:h-10"
      />
    </Link>
  );
};

export default Logo;
