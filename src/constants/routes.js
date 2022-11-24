const publicRoutes = {
  HOME: `${process.env.NEXT_PUBLIC_ROUTE}resultados`,

  /* Rutas privadas para cambiar al implementar el Login*/
  /** Administración **/
  MANAGEMENT: `${process.env.NEXT_PUBLIC_ROUTE}administracion`,
  ORGANIZATION: `${process.env.NEXT_PUBLIC_ROUTE}administracion/organizacion`,
  SURVEY: `${process.env.NEXT_PUBLIC_ROUTE}administracion/encuesta`,
  ANSWERS: `${process.env.NEXT_PUBLIC_ROUTE}administracion/respuestas`,
  STATIC_GRAPHICS: `${process.env.NEXT_PUBLIC_ROUTE}administracion/graficos-estaticos`,
  GRAPHIC: `${process.env.NEXT_PUBLIC_ROUTE}administracion/grafico`,
  GRAPHICAREA: `${process.env.NEXT_PUBLIC_ROUTE}administracion/mapa`,
  PROFILE: `${process.env.NEXT_PUBLIC_ROUTE}administracion/perfil`,

  /** Observatorio **/
  OBS_SURVEY: `${process.env.NEXT_PUBLIC_ROUTE}resultados`,
  OBS_GRAPHIC: `${process.env.NEXT_PUBLIC_ROUTE}encuesta/:id/innovacion`,
  /* */
};

const privateRoutes = {};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};

export default Routes;
