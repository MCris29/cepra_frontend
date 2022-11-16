import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Routes from "@/constants/routes";
import styles from "@/styles/Menu.module.css";
import { Tooltip } from "@mui/material";

import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

import Logo from "@/components/Logo";

const menuItems = [
  {
    title: "Organización",
    icon: <BusinessOutlinedIcon />,
    to: Routes.ORGANIZATION,
  },
  { title: "Encuesta", icon: <ArticleOutlinedIcon />, to: Routes.SURVEY },
  { title: "Respuestas", icon: <BallotOutlinedIcon />, to: Routes.ANSWERS },
  {
    title: "Gráficos estáticos",
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

  const [tabHover, setTabHover] = useState(-1);

  const handleTadSelected = (tabSelected) => {
    const currentRoute = router.pathname;
    if (currentRoute.includes(tabSelected)) return true;
    else return false;
  };

  const Tab = ({ index, href, isSelected, title, icon }) => (
    <Link href={href}>
      <div
        className={styles.tab}
        style={{
          backgroundColor: isSelected
            ? "#1f3e5c"
            : tabHover == index
            ? "#a3a5a8"
            : "transparent",
          color: isSelected || tabHover == index ? "#f7f7f7 " : "#28333e",
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

  const TabButton = ({ title, icon }) => (
    <div
      className={styles.tab}
      style={{
        backgroundColor: "transparent",
        color: "#28333e",
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
          <div className={styles.tabLogo}>
            <Logo />
          </div>
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
          <TabButton title="Cerrar Sesión" icon={<LoginOutlinedIcon />} />
        </div>
      </div>
    </>
  );
};

export default Menu;
