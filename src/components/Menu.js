import React, { useState } from "react";
import styles from "@/styles/Menu.module.css";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Divider, Hidden } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import SurveyTypeForm from "@/components/SurveyTypeForm";
import SurveyForm from "@/components/SurveyForm";
import SurveyList from "@/components/SurveyList";

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
    <Box className={styles.box}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          maxHeight: "100vh",
          overflow: "inherit",
          position: "fixed",
          minHeight: "100vh",
        }}
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
          icon={<BusinessIcon />}
          iconPosition="start"
          label={<Hidden smDown>Organización</Hidden>}
          {...a11yProps(2)}
          value={0}
        />
        <Tab
          disableRipple
          className={styles.tab}
          icon={<BallotOutlinedIcon />}
          iconPosition="start"
          label={<Hidden smDown>Encuesta</Hidden>}
          {...a11yProps(3)}
          value={1}
        />
        <Tab
          disableRipple
          className={styles.tab}
          icon={<ArticleOutlinedIcon />}
          iconPosition="start"
          label={<Hidden smDown>Respuestas</Hidden>}
          {...a11yProps(3)}
          value={2}
        />
        <Tab
          className={styles.tabTitle}
          wrapped={true}
          disabled
          label="Indicadores"
          {...a11yProps(4)}
        />
        <Tab
          disableRipple
          className={styles.tab}
          icon={<PollOutlinedIcon />}
          iconPosition="start"
          label={<Hidden smDown>Gráfico</Hidden>}
          {...a11yProps(5)}
          value={3}
        />
        <Tab
          disableRipple
          className={styles.tab}
          icon={<PublicOutlinedIcon />}
          iconPosition="start"
          label={<Hidden smDown>Área Geográfica</Hidden>}
          {...a11yProps(6)}
          value={4}
        />
        <Tab
          className={styles.tabTitle}
          wrapped={true}
          disabled
          label="Usuario"
          {...a11yProps(7)}
        />
        <Tab
          disableRipple
          className={styles.tab}
          icon={<PersonOutlineOutlinedIcon />}
          iconPosition="start"
          label={<Hidden smDown>Perfil</Hidden>}
          {...a11yProps(8)}
          value={5}
        />
        <Tab
          className={styles.tab}
          icon={<ExitToAppOutlinedIcon />}
          iconPosition="start"
          label={<Hidden smDown>Cerrar Sesión</Hidden>}
        />
      </Tabs>
      <TabPanel value={value} index={0} className={styles.tabPanel}>
        Formulario de Organización
      </TabPanel>
      <TabPanel value={value} index={1} className={styles.tabPanel}>
        <SurveyTypeForm />
        <Divider sx={{ margin: "20px 0" }} />
        <SurveyForm />
        <Divider sx={{ margin: "20px 0" }} />
        <SurveyList />
      </TabPanel>
      <TabPanel value={value} index={2} className={styles.tabPanel}>
        Formulario de respuestas
      </TabPanel>
      <TabPanel value={value} index={3} className={styles.tabPanel}>
        Gráficos 1
      </TabPanel>
      <TabPanel value={value} index={4} className={styles.tabPanel}>
        Gráfico 2
      </TabPanel>
      <TabPanel value={value} index={5} className={styles.tabPanel}>
        Perfil
      </TabPanel>
    </Box>
  );
};

export default Menu;
