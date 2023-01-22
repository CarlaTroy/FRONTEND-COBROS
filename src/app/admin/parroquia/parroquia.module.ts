import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParroquiaRoutingModule } from './parroquia-routing.module';
import { ParroquiaComponent } from './parroquia.component';
import { CrearParroquiaComponent } from './crear-parroquia/crear-parroquia.component';
import { EditarParroquiaComponent } from './editar-parroquia/editar-parroquia.component';
import { FormularioParroquiaComponent } from './formulario-parroquia/formulario-parroquia.component';
import { ListarParroquiaComponent } from './listar-parroquia/listar-parroquia.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import { VerParroquiaComponent } from './ver-parroquia/ver-parroquia.component';


@NgModule({
  declarations: [
    ParroquiaComponent,
    CrearParroquiaComponent,
    EditarParroquiaComponent,
    FormularioParroquiaComponent,
    ListarParroquiaComponent,
    VerParroquiaComponent
  ],
  imports: [
    CommonModule,
    ParroquiaRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    DialogModule,
    ToastModule,
    ProgressBarModule,
    DropdownModule
  ]
})
export class ParroquiaModule { }
