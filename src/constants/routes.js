const publicRoutes = {
  HOME: "/",

  /* Rutas privadas para cambiar al implementar el Login*/
  OBSERVATORY: "/observatorio",
  ORGANIZATION: "/observatorio/organizacion",
  SURVEY: "/observatorio/encuesta",
  ANSWER: "/observatorio/respuesta",

  GRAPHIC: "/observatorio",
  GRAPHICAREA: "/observatorio",
  PROFILE: "/observatorio",
  /* */
};

const privateRoutes = {};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};

export default Routes;