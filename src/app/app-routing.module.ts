import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { ListarLibrosComponent } from './components/listar-libros/listar-libros.component';
import { CrearAutorComponent } from './components/crear-autor/crear-autor.component';

const routes: Routes = [
  { path: '', component: ListarLibrosComponent },
  { path: 'crear-libro', component: CrearLibroComponent },
  { path: 'crear-autor', component: CrearAutorComponent },
  { path: 'editar-libro/:id', component: CrearLibroComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
