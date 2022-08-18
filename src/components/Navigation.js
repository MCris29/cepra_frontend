import React from "react";
import Link from "next/link";
import Routes from "@/constants/routes";
import styles from "@/styles/Navigation.module.css";
import { Button } from "@mui/material";

const menuItems = [
  {
    title: "Observatorio",
    to: Routes.OBSERVATORY,
  },
];

const Navigation = () => {
  return (
    <>
      <div className={styles.cover}>
        <div className={styles.login}>
          <Link href={Routes.MANAGEMENT}>
            <Button className={styles.button_login}>Iniciar Sesión</Button>
          </Link>
        </div>
        <div className={styles.logo}>CEPRA</div>
      </div>
      <div className={styles.container}>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.to}>
            <div className={styles.item}>{item.title}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navigation;
