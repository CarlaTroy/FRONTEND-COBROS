import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CantonRoutingModule } from './canton-routing.module';
import { CrearCantonComponent } from './crear-canton/crear-canton.component';
import { EditarCantonComponent } from './editar-canton/editar-canton.component';
import { FormularioCantonComponent } from './formulario-canton/formulario-canton.component';
import { ListarCantonComponent } from './listar-canton/listar-canton.component';
import { CantonComponent } from './canton.component';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import {GMapModule} from 'primeng/gmap';
import {DialogModule} from 'primeng/dialog';
import {CheckboxModule} from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { VerCantonComponent } from './ver-canton/ver-canton.component';


@NgModule({
  declarations: [
    CrearCantonComponent,
    EditarCantonComponent,
    FormularioCantonComponent,
    ListarCantonComponent,
    CantonComponent,
    VerCantonComponent
  ],
  imports: [
    CommonModule,
    CantonRoutingModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressBarModule,
    TableModule,
    ButtonModule,
    GMapModule,
    DialogModule,
    ToastModule,
    CheckboxModule
  ],
  providers: [MessageService],
})
export class CantonModule { }
