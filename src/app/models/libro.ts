export class Libro {
    _id?: number;
    nombre: string;
    descripcion: string;
    nro_paginas: string;
    autor: string;

    constructor(nombre: string, descripcion: string, nro_paginas: string, autor: string ){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.nro_paginas = nro_paginas;
        this.autor = autor;
    }
}