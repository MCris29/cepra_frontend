const publicRoutes = {
  HOME: "/",

  /* Rutas privadas para cambiar al implementar el Login*/
  /** Administración **/
  MANAGEMENT: "/administracion",
  ORGANIZATION: "/administracion/organizacion",
  SURVEY: "/administracion/encuesta",
  ANSWER: "/administracion/respuesta",
  GRAPHIC: "/administracion/grafico",
  GRAPHICAREA: "/administracion/area-geografica",
  PROFILE: "/administracion/perfil",

  /** Observatorio **/
  OBSERVATORY: "/observatorio",
  ENERGY: "/observatorio/energia",
  PERFORMANCE: "/observatorio/desempeno",
  INNOVATION: "/observatorio/innovacion",
  OBS_GRAPHICAREA: "/observatorio/area-geografica",

  /* */
};

const privateRoutes = {};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};

export default Routes;
