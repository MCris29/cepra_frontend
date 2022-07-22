import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/Menu.module.css";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

const Tab = ({ href, isSelected, title, icon }) => (
  <Link href={href}>
    <div
      className={styles.tab}
      style={{
        backgroundColor: isSelected ? "#D9D9D9" : "transparent",
        color: isSelected ? "#2F2F2F " : "#2A2A2A",
      }}
    >
      <span>{icon}</span>
      <p>{title}</p>
    </div>
  </Link>
);

const Menu = () => {
  const { query } = useRouter();
  const router = useRouter();

  const isTabOrganizationSelected = !!query.tab1;
  const isTabSurveySelected = !!query.tab2;
  const isTabAnswerSelected = !!query.tab3;
  const isTabGraphicSelected = !!query.tab4;
  const isTabGraphicAreaSelected = !!query.tab5;
  const isTabProfileSelected = !!query.tab6;
  const isTabLogOutSelected = !!query.tab7;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tabs}>
          <div className={styles.tabLogo}>
            <Link href="/">CEPRA</Link>
          </div>
          <div className={styles.tabTitle}>Datos</div>
          <Tab
            href="/observatorio/organizacion?tab1=true"
            title="Organización"
            icon={<BusinessOutlinedIcon />}
            isSelected={isTabOrganizationSelected}
          />
          <Tab
            href="/observatorio/encuesta?tab2=true"
            title="Encuesta"
            icon={<ArticleOutlinedIcon />}
            isSelected={isTabSurveySelected}
          />
          <Tab
            href="/observatorio/respuesta?tab3=true"
            title="Respuesta"
            icon={<BallotOutlinedIcon />}
            isSelected={isTabAnswerSelected}
          />
          <div className={styles.tabTitle}>Indicadores</div>
          <Tab
            href="/observatorio?tab4=true"
            title="Gráfico"
            icon={<PollOutlinedIcon />}
            isSelected={isTabGraphicSelected}
          />
          <Tab
            href="/observatorio?tab5=true"
            title="Área Geográfica"
            icon={<PublicOutlinedIcon />}
            isSelected={isTabGraphicAreaSelected}
          />
          <div className={styles.tabTitle}>Usuario</div>
          <Tab
            href="/observatorio?tab6=true"
            title="Perfil"
            icon={<AccountCircleOutlinedIcon />}
            isSelected={isTabProfileSelected}
          />
          <Tab
            href="/observatorio?tab7=true"
            title="Cerrar Sesión"
            icon={<LoginOutlinedIcon />}
            isSelected={isTabLogOutSelected}
          />
        </div>
      </div>
    </>
  );
};

export default Menu;
