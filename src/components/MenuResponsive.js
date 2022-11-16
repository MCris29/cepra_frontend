import React, { useState } from "react";
import styles from "@/styles/Navigation.module.css";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Routes from "@/constants/routes";
import Link from "next/link";
import Logo from "@/components/Logo";

const DesktopAppbar = () => {
  return (
    <div className={styles.desktopAppbar}>
      <Logo className={styles.logo} />
      <Link href={Routes.MANAGEMENT}>
        <span className={styles.login_button}>Administrar</span>
      </Link>
    </div>
  );
};

const MobileAppbar = () => {
  return (
    <div className={styles.mobileAppbar}>
      <Logo />
      <Link href={Routes.MANAGEMENT}>
        <span className={styles.login_button}>Administrar</span>
      </Link>
    </div>
  );
};

const ResponsiveAppBar = () => {
  return (
    <>
      <DesktopAppbar />
      <MobileAppbar />
    </>
  );
};
export default ResponsiveAppBar;
