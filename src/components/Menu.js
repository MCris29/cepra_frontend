import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Routes from "@/constants/routes";
import styles from "@/styles/Menu.module.css";
import { Tooltip } from "@mui/material";

import { useAuth } from "@/lib/auth";

import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

const menuItems = [
  {
    title: "Organización",
    icon: <BusinessOutlinedIcon />,
    to: Routes.ORGANIZATION,
  },
  { title: "Encuesta", icon: <ArticleOutlinedIcon />, to: Routes.SURVEY },
  { title: "Respuesta", icon: <BallotOutlinedIcon />, to: Routes.ANSWERS },
  {
    title: "Gráfico estático",
    icon: <UploadFileOutlinedIcon />,
    to: Routes.STATIC_GRAPHICS,
  },
];

const indicatorsItems = [
  // { title: "Gráfico", icon: <PollOutlinedIcon />, to: Routes.GRAPHIC },
  {
    title: "Área Geográfica",
    icon: <PublicOutlinedIcon />,
    to: Routes.GRAPHICAREA,
  },
];

const Menu = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const [tabHover, setTabHover] = useState(-1);

  const handleTadSelected = (tabSelected) => {
    const currentRoute = router.pathname;
    if (currentRoute.includes(tabSelected)) return true;
    else return false;
  };

  const handleLogout = () => {
    logout();
  };

  const Tab = ({ index, href, isSelected, title, icon }) => (
    <Link href={href}>
      <div
        className={styles.tab}
        style={{
          borderLeft: isSelected
            ? "3px solid #e37b00"
            : tabHover == index
            ? "#a3a5a8"
            : "transparent",
          color: isSelected
            ? "#0C89CB"
            : tabHover == index
            ? "#05579f "
            : "#0C89CB",
        }}
        onMouseEnter={() => setTabHover(index)}
        onMouseLeave={() => setTabHover(-1)}
      >
        <span>
          <Tooltip title={title} placement="right">
            {icon}
          </Tooltip>
        </span>
        <p>{title}</p>
      </div>
    </Link>
  );

  const TabButton = ({ title, icon, action }) => (
    <div
      className={styles.tab}
      style={{
        backgroundColor: "transparent",
        color: "#0c89cb",
      }}
      onClick={() => {
        action();
      }}
    >
      <span>
        <Tooltip title={title} placement="right">
          {icon}
        </Tooltip>
      </span>
      <p>{title}</p>
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tabs}>
          <div className={styles.tabTitle}>Datos</div>
          {menuItems.map((item, index) => (
            <Tab
              key={index}
              index={index}
              title={item.title}
              icon={item.icon}
              href={item.to}
              isSelected={handleTadSelected(item.to)}
            />
          ))}

          <div className={styles.tabTitle}>Indicadores</div>
          {indicatorsItems.map((item, index) => (
            <Tab
              key={index}
              index={index + "indicator"}
              title={item.title}
              icon={item.icon}
              href={item.to}
              isSelected={handleTadSelected(item.to)}
            />
          ))}

          <div className={styles.tabTitle}>Usuario</div>
          <Tab
            title="Perfil"
            icon={<AccountCircleOutlinedIcon />}
            href={Routes.PROFILE}
            isSelected={handleTadSelected(Routes.PROFILE)}
          />
          <TabButton
            title="Cerrar Sesión"
            icon={<LoginOutlinedIcon />}
            action={handleLogout}
          />
        </div>
      </div>
    </>
  );
};

export default Menu;
