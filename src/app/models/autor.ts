export class Autor {
    _id?: number;
    nombre: string;
    apellido: string;
    edad: string;

    constructor(nombre: string, apellido: string, edad: string ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}