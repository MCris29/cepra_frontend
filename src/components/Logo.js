import React from "react";
import Link from "next/link";
import Routes from "@/constants/routes";

const Logo = () => {
  return (
    <Link href={Routes.HOME}>
      <div>
        <img
          src={`${process.env.NEXT_PUBLIC_ROUTE}Logo-o2i.png`}
          className={"logo"}
          alt="O2I"
        />
      </div>
    </Link>
  );
};

export default Logo;
