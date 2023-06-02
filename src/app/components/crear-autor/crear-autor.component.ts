import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Autor } from 'src/app/models/autor';
import { AutorService } from 'src/app/services/autor.service';

@Component({
  selector: 'app-crear-autor',
  templateUrl: './crear-autor.component.html',
  styleUrls: ['./crear-autor.component.css'],
})
export class CrearAutorComponent implements OnInit {
  autorForm: FormGroup;

  titulo = 'Crear autor';

  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private autorService: AutorService,
    private activatedRoute: ActivatedRoute
  ) {
    this.autorForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarAutor() {
    const AUTOR: Autor = {
      nombre: this.autorForm.value.nombre,
      apellido: this.autorForm.value.apellido,
      edad: this.autorForm.value.edad,
    };

    if (this.id !== null) {
      // Editar autor
      this.autorService.editarAutor(this.id, AUTOR).subscribe({
        next: (data) => {
          this.toastr.info('El autor fue editado con éxito!', 'Autor actualizado!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error, 'Error al editar el autor');
          this.toastr.error('Error al editar el autor!');
          this.autorForm.reset();
        },
      });
    } else {
      // Agregar autor
      this.autorService.crearAutor(AUTOR).subscribe({
        next: (data) => {
          this.toastr.success('El autor fue registrado con éxito!', 'Autor Registrado!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error, 'Error al crear el autor');
          this.toastr.error('Error al crear el autor!');
          this.autorForm.reset();
        },
      });
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar autor';
      console.log('Estamos editando un autor', this.id);

      this.autorService._editarAutor(this.id).subscribe({
        next: (data) => {
          this.autorForm.setValue({
            nombre: data.nombre,
            apellido: data.apellido,
            edad: data.edad,
          });
        },
        error: (error) => {
          console.log('Error al obtener datos del autor en el formulario de edición', error);
        },
      });
    }
  }
}
