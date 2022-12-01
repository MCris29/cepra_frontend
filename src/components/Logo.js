import React from "react";
import Link from "next/link";
import Routes from "@/constants/routes";

const Logo = () => {
  return (
    <Link href={Routes.HOME}>
      <div>
        <img src={"/o2i/Logo-o2i.jpg"} className={"logo"} alt="O2I" />
      </div>
    </Link>
  );
};

export default Logo;
