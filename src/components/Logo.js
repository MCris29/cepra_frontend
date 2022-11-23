import React from "react";
import Link from "next/link";
import Routes from "@/constants/routes";

const Logo = () => {
  return (
    <Link href={Routes.HOME}>
      <div>
        <img
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
