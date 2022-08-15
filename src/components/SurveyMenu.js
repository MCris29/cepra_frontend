import React, { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import SettingsIcon from "@mui/icons-material/Settings";
import { SurveyTemplates } from "@/lib/surveyTemplate";
import axios from "axios";
import { Stack, Snackbar, AlertTitle } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const SurveyMenu = () => {
  const [itemArray, setItemArray] = useState([]);

  const [openError, setOpenError] = useState(false);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    try {
      SurveyTemplates.getAll()
        .then((response) => {
          if (response.data.data) {
            let surveyTemplate = response.data.data;
            setItemArray([]);
            let newItemArray = [];
            for (let index = 0; index < surveyTemplate.length; index++) {
              let newSubItemArray = [];
              surveyTemplate[index].preguntas.forEach((question) => {
                let subItem = {
                  name: question.itpre_nombre,
                  label: question.itpre_nombre,
                  id: question.itpre_codigo,
                  onClick,
                };
                newSubItemArray.push(subItem);
              });
              let item = {
                name: surveyTemplate[index].itcat_nombre,
                label: surveyTemplate[index].itcat_nombre,
                items: newSubItemArray,
              };
              newItemArray.push(item);
              if (index < surveyTemplate.length - 1) {
                newItemArray.push("divider");
              }
            }
            setItemArray(newItemArray);
          }
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            axiosErrorHandler(error);
          } else {
            setMessageError(error.message);
            setOpenError(true);
          }
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        axiosErrorHandler(error);
      } else {
        setMessageError(error.message);
        setOpenError(true);
      }
    }
  });

  //Mensaje de alerta
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const onClick = (e, item) => {
    window.alert(JSON.stringify(item, null, 2));
  };

  const axiosErrorHandler = (error) => {
    console.log(error);
    const nameRequest = `"${error.config.baseURL}${error.config.url}" `;
    let message = "";
    if (error.code == "ERR_NETWORK") {
      message = "No se ha podido establecer conexión con el servidor.";
    } else if (error.code == "ERR_BAD_REQUEST") {
      message =
        "Error " +
        error.request.status +
        "." +
        " Solicitud " +
        nameRequest +
        "fallida. " +
        error.request.statusText +
        ". ";
    } else if (error.code == "ERR_BAD_RESPONSE") {
      message =
        "Error " +
        error.response.status +
        "." +
        " Respuesta " +
        nameRequest +
        "fallida." +
        error.response.data.message +
        ". " +
        error.response.data.error +
        ".";
    } else {
      message = error.message + "." + " Solicitud " + nameRequest + "fallida. ";
    }
    setMessageError(message);
    setOpenError(true);
  };

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
    <div>
      <Sidebar items={itemArray} />
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={() => {
            setOpenError(false);
          }}
        >
          <Alert
            onClose={() => {
              setOpenError(false);
            }}
            severity={"error"}
            sx={{ width: "100%" }}
          >
            <AlertTitle>Error</AlertTitle>
            {messageError}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default SurveyMenu;
