import React from "react";
import Link from "next/link";
import Routes from "@/constants/routes";
import styles from "@/styles/Observatory.module.css";

const items = [
  { title: "Energía", to: Routes.ENERGY },
  { title: "Innovación", to: Routes.INNOVATION },
  { title: "Desempeño", to: Routes.PERFORMANCE },
];

const SurveyMenu = () => {
  return (
    <>
      {items.map((item, index) => (
        <Link key={index} href={item.to}>
          <div className={styles.item}>{item.title}</div>
        </Link>
      ))}
    </>
  );
};

export default SurveyMenu;
