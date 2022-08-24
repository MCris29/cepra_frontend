import React from "react";
import Link from "next/link";
import Routes from "@/constants/routes";
import styles from "@/styles/Navigation.module.css";
import {Button, MenuItem, MenuList} from "@mui/material";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

import Demo from './Demo';
import Demo2 from './Demo2';
const menuItems = [
  {
    title: "Observatorio",
    to: Routes.OBSERVATORY,
  },
];

const items = [
    { title: "Energía", to: Routes.ENERGY },
    { title: "Innovación", to: Routes.INNOVATION },
    { title: "Desempeño", to: Routes.PERFORMANCE },
];

const Navigation = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
  return (
    <>
      <div className={styles.container}>
          <div className={styles.logo} style={{alignItems: "center"}}>CEPRA</div>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.to}>
            <div className={styles.item}>{item.title}</div>
          </Link>
        ))}
          <Button
              variant="contained"
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
          >
              Tipos de Encuesta
          </Button>
          <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
          >
              {({ TransitionProps, placement }) => (
                  <Grow
                      {...TransitionProps}
                      style={{
                          transformOrigin:
                              placement === 'bottom-start' ? 'left top' : 'left bottom',
                      }}
                  >
                      <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                  autoFocusItem={open}
                                  id="composition-menu"
                                  aria-labelledby="composition-button"
                                  onKeyDown={handleListKeyDown}
                              >
                                  {items.map((item, index) => (
                                      <Link key={index} href={item.to}>
                                          <MenuItem onClick={handleClose}>{item.title}</MenuItem>
                                      </Link>
                                  ))}
                              </MenuList>
                          </ClickAwayListener>
                      </Paper>
                  </Grow>
              )}
          </Popper>

          <Link href={Routes.MANAGEMENT}>
              <Button className={styles.button_login}>Iniciar Sesión</Button>
          </Link>
      </div>
    </>
  );
};

export default Navigation;
