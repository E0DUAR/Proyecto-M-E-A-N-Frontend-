import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  url = 'http://localhost:4000/api/autores/';

  constructor(private http: HttpClient) { }

  getAutores(): Observable<any> {
    return this.http.get(this.url);
  }

  crearAutor(autor: Autor): Observable<any> {
    return this.http.post(this.url, autor);
  }

  _editarAutor(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarAutor(id: string, autor: Autor): Observable<any> {
    return this.http.put(this.url + id, autor);
  }

  eliminarAutor(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
