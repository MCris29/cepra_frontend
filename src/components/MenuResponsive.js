import React, { useState } from "react";
import styles from "@/styles/Navigation.module.css";
import Link from "next/link";
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import Routes from "@/constants/routes";
import Logo from "@/components/Logo";

const items = [
  {
    label: "Nosotros",
    to: "https://observatorio-o2i.epn.edu.ec/about/",
  },
  {
    label: "Proyecto",
    to: "",
  },
  {
    label: "Resultados",
    to: Routes.OBS_SURVEY,
  },
  {
    label: "Administrar",
    to: Routes.LOGIN,
  },
];

const DesktopAppbar = () => {
  return (
    <div className={styles.desktopAppbar}>
      <Logo className={styles.logo} />
      <div className={styles.items}>
        {items.map((item, index) => (
          <Link key={index} href={item.to}>
            <span className={styles.item}>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const MobileAppbar = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <Link href={item.to}>
                <ListItemText primary={item.label} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className={styles.mobileAppbar}>
      <div>
        <Button
          onClick={toggleDrawer("left", true)}
          style={{ color: "#4e555c" }}
        >
          <MenuIcon />
        </Button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </div>
      <Logo />
      <div className={styles.item}>
        <span> </span>
      </div>
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
