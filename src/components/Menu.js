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
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

const adminItems = [
  {
    title: "Usuarios",
    icon: <SupervisedUserCircleIcon />,
    to: Routes.USERS,
  },
];

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
  {
    title: "Área Geográfica",
    icon: <PublicOutlinedIcon />,
    to: Routes.GRAPHICAREA,
  },
];

const Menu = () => {
  const router = useRouter();
  const { logout, user } = useAuth();

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

  const AdminMenu = ({ user }) => {
    // Se presenta para el administrador
    let rol = user.roles[0].itrol_codigo;
    if (rol == 1) {
      return (
        <>
          <div className={styles.tabTitle}>Administrar</div>
          {adminItems.map((item, index) => (
            <Tab
              key={index}
              index={index}
              title={item.title}
              icon={item.icon}
              href={item.to}
              isSelected={handleTadSelected(item.to)}
            />
          ))}
        </>
      );
    }
  };

  const InvestigatorMenu = () => {
    // Se presenta para el administrador e investigador
    let rol = user.roles[0].itrol_codigo;
    if (rol == 1 || rol == 2) {
      return (
        <>
          <div className={styles.tabTitle}>
            Datos{" "}
            <span>
              <img
                src={"/o2i/datos_ico.png"}
                className={styles.ico}
                style={{ width: "17px", height: "28px" }}
                alt="ico"
              />
            </span>
          </div>
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
          <div className={styles.tabTitle}>
            Indicadores{" "}
            <span>
              <img
                src={"/o2i/indicadores_ico.png"}
                className={styles.ico}
                style={{ width: "24px", height: "22px" }}
                alt="ico"
              />
            </span>
          </div>
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
        </>
      );
    }
  };

  const UserMenu = () => {
    // Se presenta para todos los usuarios
    return (
      <>
        <div className={styles.tabTitle}>
          Usuario{" "}
          <span>
            <img
              src={"/o2i/usuario_ico.png"}
              className={styles.ico}
              style={{ width: "19px", height: "22px" }}
              alt="ico"
            />
          </span>
        </div>
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
      </>
    );
  };

  if (user) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.tabs}>
            <AdminMenu user={user} />
            <InvestigatorMenu />
            <UserMenu />
          </div>
        </div>
      </>
    );
  }
};

export default Menu;
