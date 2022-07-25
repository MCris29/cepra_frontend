import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Routes from "@/constants/routes";
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

const TabButton = ({ title, icon }) => (
  <div
    className={styles.tab}
    style={{
      backgroundColor: "transparent",
      color: "#2A2A2A",
    }}
  >
    <span>{icon}</span>
    <p>{title}</p>
  </div>
);

const Menu = () => {
  const router = useRouter();

  const handleTadSelected = (tabSelected) => {
    const currentRoute = router.pathname;
    if (tabSelected === currentRoute) return true;
    else return false;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tabs}>
          <div className={styles.tabLogo}>
            <Link href={Routes.HOME}>CEPRA</Link>
          </div>
          <div className={styles.tabTitle}>Datos</div>
          <Tab
            title="Organización"
            icon={<BusinessOutlinedIcon />}
            href={Routes.ORGANIZATION}
            isSelected={handleTadSelected(Routes.ORGANIZATION)}
          />
          <Tab
            title="Encuesta"
            icon={<ArticleOutlinedIcon />}
            href={Routes.SURVEY}
            isSelected={handleTadSelected(Routes.SURVEY)}
          />
          <Tab
            title="Respuesta"
            icon={<BallotOutlinedIcon />}
            href={Routes.ANSWER}
            isSelected={handleTadSelected(Routes.ANSWER)}
          />
          <div className={styles.tabTitle}>Indicadores</div>
          <Tab
            title="Gráfico"
            icon={<PollOutlinedIcon />}
            href={Routes.GRAPHIC}
            isSelected={handleTadSelected(Routes.GRAPHIC)}
          />
          <Tab
            title="Área Geográfica"
            icon={<PublicOutlinedIcon />}
            href={Routes.GRAPHICAREA}
            isSelected={handleTadSelected(Routes.GRAPHICAREA)}
          />
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
