export class Question {
    constructor(
        codigo_pregunta,
        codigo_pregunta_padre,
        nombre_pregunta,
        observacion_pregunta,
        tipo_dato,
        grupo_opciones
    ) {
        this.codigo_pregunta = codigo_pregunta;
        this.codigo_pregunta_padre = codigo_pregunta_padre;
        this.nombre_pregunta = nombre_pregunta;
        this.observacion_pregunta = observacion_pregunta;
        this.tipo_dato = tipo_dato;
        this.grupo_opciones = grupo_opciones;
    }
}