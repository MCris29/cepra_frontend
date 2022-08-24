import React, { useState } from "react";

import Sidebar from "@/components/Sidebar";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import SettingsIcon from "@mui/icons-material/Settings";
import { SurveyTemplates } from "@/lib/surveyTemplate";
import axios from "axios";
import {Stack, Snackbar, AlertTitle, Grid} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import GenericGraphic from "@/components/GenericGraphic";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SurveyIndicators = () => {
  let dataGraphic = undefined;
  let isLoadingGraphic = false;
  let isErrorGraphic = false;
  let itemArray = [];

  function getStatus({ data, error }) {
    if (error && !data) return "error";
    if (!data) return "loading";
  }

  function GetAllSurveyTemplates() {
    const { data , error } = useSWR("it/datosGrafico2/", fetcher, { shouldRetryOnError: false } );
    const status = getStatus({ data, error });
    const isLoading = status === "loading";
    const isError = status === "error";
    dataGraphic = data;
    isLoadingGraphic = isLoading;
    isErrorGraphic = isError;
  }

  GetAllSurveyTemplates();

  if (isErrorGraphic) {
    return <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
          open={true}
          autoHideDuration={6000}>
        <Alert
            severity={"error"}
            sx={{ width: "100%" }}>
          <AlertTitle>Error al intentar conectar con al servidor!</AlertTitle>
          Por favor, intente más tarde.
        </Alert>
      </Snackbar>
    </Stack>;
  }

  if (isLoadingGraphic) {
    return <p>Loading Pokémon...</p>;
  }

  const onClick = (e, item) => {
    window.alert(JSON.stringify(item, null, 2));
  };

  // let surveyTemplate = dataGraphic.data;
  // let newItemArray = [];
  // for (let index = 0; index < surveyTemplate.length; index++) {
  //   let newSubItemArray = [];
  //   surveyTemplate[index].preguntas.forEach((question) => {
  //     let subItem = {
  //       name: question.itpre_nombre,
  //       label: question.itpre_nombre,
  //       id: question.itpre_codigo,
  //       onClick,
  //     };
  //     newSubItemArray.push(subItem);
  //   });
  //   let item = {
  //     name: surveyTemplate[index].itcat_nombre,
  //     label: surveyTemplate[index].itcat_nombre,
  //     items: newSubItemArray,
  //   };
  //   newItemArray.push(item);
  //   if (index < surveyTemplate.length - 1) {
  //     newItemArray.push("divider");
  //   }
  // }
  // itemArray = newItemArray;


  const items = [
    {
      name: "billing",
      label: "Billing",
      items: [
        { name: "statements", label: "Statements", onClick, itpre_codigo: 8 },
        { name: "reports", label: "Reports", onClick },
      ],
    },
    "divider",
    {
      name: "settings",
      label: "Settings",
      Icon: SettingsIcon,
      items: [
        { name: "profile", label: "Profile" },
        { name: "insurance", label: "Insurance", onClick },
        "divider",
        {
          name: "notifications",
          label: "Notifications",
          Icon: NotificationsIcon,
          items: [
            { name: "email", label: "Email", onClick },
            {
              name: "desktop",
              label: "Desktop",
              Icon: DesktopWindowsIcon,
              items: [
                { name: "schedule", label: "Schedule" },
                { name: "frequency", label: "Frequency" },
              ],
            },
            { name: "sms", label: "SMS" },
          ],
        },
      ],
    },
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Sidebar items={items} />
      </Grid>
    </Grid>
  );
};

export default SurveyIndicators;
