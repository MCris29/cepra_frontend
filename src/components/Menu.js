import React, { useState } from "react";
import styles from "@/styles/Menu.module.css";
import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";

import ContactList from "@/components/ContactList";
import SurveyTypeForm from "@/components/SurveyTypeForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Menu = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", maxHeight: "100vh" }}
      >
        <Tab disabled label="CEPRA" {...a11yProps(0)} />
        <Tab
          className={styles.tabTitle}
          wrapped={true}
          disabled
          label="Datos"
          {...a11yProps(1)}
        />
        <Tab
          disableRipple
          className={styles.tab}
          icon={<ContactsOutlinedIcon />}
          iconPosition="start"
          label="Contactos"
          {...a11yProps(2)}
          value={0}
        />
        <Tab
          disableRipple
          className={styles.tab}
          icon={<BusinessIcon />}
          iconPosition="start"
          label="Organización"
          {...a11yProps(3)}
          value={1}
        />
        <Tab
          disableRipple
          className={styles.tab}
          icon={<BallotOutlinedIcon />}
          iconPosition="start"
          label="Encuesta"
          value={2}
          {...a11yProps(4)}
        />
        <Tab
          className={styles.tabTitle}
          wrapped={true}
          disabled
          label="Indicadores"
          {...a11yProps(5)}
        />
        <Tab
          disableRipple
          className={styles.tab}
          icon={<PollOutlinedIcon />}
          iconPosition="start"
          label="Gráfico"
          {...a11yProps(6)}
          value={3}
        />
        <Tab
          disableRipple
          className={styles.tab}
          icon={<PublicOutlinedIcon />}
          iconPosition="start"
          label="Área geográfica"
          {...a11yProps(7)}
          value={4}
        />
        <Tab
          className={styles.tabTitle}
          wrapped={true}
          disabled
          label="Usuario"
          {...a11yProps(8)}
        />
        <Tab
          disableRipple
          className={styles.tab}
          icon={<PersonOutlineOutlinedIcon />}
          iconPosition="start"
          label="Perfil"
          {...a11yProps(9)}
          value={5}
        />
        <Tab
          className={styles.tab}
          icon={<ExitToAppOutlinedIcon />}
          iconPosition="start"
          label="Cerrar Sesión"
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ContactList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Formulario de Organización
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SurveyTypeForm />
        <div>Datos de la encuesta</div>
        <div>Plantilla de encuesta</div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Gráficos 1
      </TabPanel>
      <TabPanel value={value} index={4}>
        Gráfico 2
      </TabPanel>
      <TabPanel value={value} index={5}>
        Perfil
      </TabPanel>
    </Box>
  );
};

export default Menu;
