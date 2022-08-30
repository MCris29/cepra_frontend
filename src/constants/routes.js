const publicRoutes = {
  HOME: "/",

  /* Rutas privadas para cambiar al implementar el Login*/
  /** Administración **/
  MANAGEMENT: "/administracion",
  ORGANIZATION: "/administracion/organizacion",
  SURVEY: "/administracion/encuesta",
  ANSWER: "/administracion/respuesta",
  GRAPHIC: "/administracion/innovacion",
  GRAPHICAREA: "/administracion/area-geografica",
  PROFILE: "/administracion/perfil",

  /** Observatorio **/
  OBS_SURVEY: "/survey",
  OBS_GRAPHIC: "/encuesta/:id/innovacion",
  /* */
};

const privateRoutes = {};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};

export default Routes;
