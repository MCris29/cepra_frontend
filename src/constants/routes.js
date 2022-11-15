const publicRoutes = {
  HOME: "/encuesta",

  /* Rutas privadas para cambiar al implementar el Login*/
  /** Administración **/
  MANAGEMENT: "/administracion",
  ORGANIZATION: "/administracion/organizacion",
  SURVEY: "/administracion/encuesta",
  ANSWERS: "/administracion/respuestas",
  STATIC_GRAPHICS: "/administracion/graficos-estaticos",
  GRAPHIC: "/administracion/grafico",
  GRAPHICAREA: "/administracion/mapa",
  PROFILE: "/administracion/perfil",

  /** Observatorio **/
  OBS_SURVEY: "/encuesta",
  OBS_GRAPHIC: "/encuesta/:id/innovacion",
  /* */
};

const privateRoutes = {};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};

export default Routes;
