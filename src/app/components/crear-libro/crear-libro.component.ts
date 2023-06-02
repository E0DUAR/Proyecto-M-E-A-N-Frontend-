import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Autor } from 'src/app/models/autor';
import { Libro } from 'src/app/models/libro';
import { AutorService } from 'src/app/services/autor.service';
import { LibroService } from 'src/app/services/libro.service';


@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css'],
})
export class CrearLibroComponent implements OnInit {
  libroForm: FormGroup;

  titulo = 'Crear libro';

  id: String | null;

  autores: Autor[] = [];

  autorSeleccionado: Autor | null = null;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _autorService: AutorService,
    private _libroService: LibroService,
    private aRouter: ActivatedRoute
  ) {
    this.libroForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      nro_paginas: ['', Validators.required],
      autor: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerAutores();
    this.esEditar();
  }

  obtenerAutores() {
    this._autorService.getAutores().subscribe({
      next: (autores: Autor[]) => {
        this.autores = autores; // Asigna los datos devueltos a la variable autores
      },
      error: (error) => {
        console.log(error, 'Error al obtener los autores');
      },
    });
  }


  agregarLibro() {

    const _autorSeleccionado = this.autores.find(
      (autor) => autor._id === this.libroForm.value.autor
    );
    

    this.autorSeleccionado = _autorSeleccionado ?? null;

      const LIBRO: Libro = {
        nombre: this.libroForm.value.nombre,
        descripcion: this.libroForm.value.descripcion,
        nro_paginas: this.libroForm.value.nro_paginas,
        //autor: this.libroForm.value.autor,  
        autor: this.autorSeleccionado ? this.autorSeleccionado.nombre + ' ' + this.autorSeleccionado.apellido : '',
      };

      if (this.id !== null) {
        //editar producto
        this._libroService.editarProducto(this.id, LIBRO).subscribe({
          next: (data) => {
            this.toastr.info(
              'El libro fue editado con exito!',
              'Libro actualizado!'
            );
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.log(error, 'Error al editar el libro');
            this.toastr.error('Error al editar el libro!');
            this.libroForm.reset();
          },
        });
      } else {
        //agregar producto
        console.log(LIBRO);

        this._libroService.crearLibro(LIBRO).subscribe({
          next: (data) => {
            this.toastr.success(
              'El libro fue registrado con exito!',
              'Libro Registrado!'
            );
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.log(error, 'Error al crear el libro');
            this.toastr.error('Error al crear el libro!');
            this.libroForm.reset();
          },
        });
      }
    
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar libro';
      console.log('Estamos editando un libro', this.id);

      this._libroService._editarLibro(this.id).subscribe({
        next: (data) => {
          this.libroForm.setValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
            nro_paginas: data.nro_paginas,
            //autor: data.autor,
            autor: data.autor,
          });

          // Guarda el autor actualmente presente en la propiedad autorSeleccionado
        //this.autorSeleccionado = data.autor;
        },
        error: (error) => {
          console.log(
            'Error al obtener datos del libro en el formulario de edición',
            error
          );
        },
      });
    }
  }
}
