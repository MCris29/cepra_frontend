import React from "react";
import Link from "next/link";
import Routes from "@/constants/routes";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href={Routes.HOME}>
      <div>
        <Image
          src="/Logo-o2i.png"
          alt="Picture of the author"
          width={70}
          height={50}
          style={{ cursor: "pointer" }}
        />
      </div>
    </Link>
  );
};

export default Logo;
