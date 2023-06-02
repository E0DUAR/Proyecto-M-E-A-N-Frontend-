import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  url = 'http://localhost:4000/api/libros/';

  constructor(private http:HttpClient) { }

  getLibros(): Observable<any> {
    return this.http.get(this.url);
  }

  crearLibro(libro: Libro):Observable<any> {
    return this.http.post(this.url, libro);
  }

  _editarLibro(id:String): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarProducto(id:String, libro:Libro): Observable<any> {
    return this.http.put(this.url + id, libro);
  }

  eliminarProducto(id: String):Observable<any>{
    return this.http.delete(this.url + id);
  }
}
