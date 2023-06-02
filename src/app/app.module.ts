import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from "@angular/common/http"

import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { ListarLibrosComponent } from './components/listar-libros/listar-libros.component';
import { CrearAutorComponent } from './components/crear-autor/crear-autor.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearLibroComponent,
    ListarLibrosComponent,
    CrearAutorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
