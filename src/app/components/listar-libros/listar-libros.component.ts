import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-listar-libros',
  templateUrl: './listar-libros.component.html',
  styleUrls: ['./listar-libros.component.css']
})
export class ListarLibrosComponent implements OnInit {

  listaLibros: Libro[] = [];

  constructor(private _libroService:LibroService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros() {
    this._libroService.getLibros().subscribe({
      next: (data) => {
        console.log(data);
        this.listaLibros = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  eliminarLibro(id:any){
    this._libroService.eliminarProducto(id).subscribe({
      next:(data) =>{
        console.log("El libro fue eliminado con exito");
        this.toastr.error('El libro fue eliminado con exito');
        this.obtenerLibros();
      },
      error: (error) => {
        console.log("error al eliminar el libro", error);
      }
    });
  }

}
