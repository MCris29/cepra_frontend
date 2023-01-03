const publicRoutes = {
  HOME: "/",
  LOGIN: "/iniciar-sesion",
  OBS_SURVEY: "/resultados",
};

const privateRoutes = {
  MANAGEMENT: "/administracion/perfil",
  ORGANIZATION: "/administracion/organizacion",
  SURVEY: "/administracion/encuesta",
  ANSWERS: "/administracion/respuestas",
  STATIC_GRAPHICS: "/administracion/graficos-estaticos",
  GRAPHIC: "/administracion/grafico",
  GRAPHICAREA: "/administracion/mapa",

  PROFILE: "/administracion/perfil",
  USERS: "/administracion/usuarios",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};

export default Routes;
