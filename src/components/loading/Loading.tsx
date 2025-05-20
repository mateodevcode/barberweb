import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white z-40">
      <div>
        <Image src="/logo/logo-bs.png" alt="Loading" width={100} height={100} />
      </div>
    </div>
  );
};

export default Loading;
