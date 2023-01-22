import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntermediarioRoutingModule } from './intermediario-produccion-routing.module';
import { IntermediarioProduccionComponent } from './intermediario-produccion.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ListarIntermediarioProduccionComponent } from './listar-intermediario-produccion/listar-intermediario-produccion.component';
import { FormularioIntermediarioProduccionComponent } from './formulario-intermediario-produccion/formulario-intermediario-produccion.component';
import { EditarIntermediarioProduccionComponent } from './editar-intermediario-produccion/editar-intermediario-produccion.component';
import { CrearIntermediarioProduccionComponent } from './crear-intermediario-produccion/crear-intermediario-produccion.component';

import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { VerIntermediarioProduccionComponent } from './ver-intermediario-produccion/ver-intermediario-produccion.component';

@NgModule({
  declarations: [
    IntermediarioProduccionComponent,
    CrearIntermediarioProduccionComponent,
    EditarIntermediarioProduccionComponent,
    FormularioIntermediarioProduccionComponent,
    ListarIntermediarioProduccionComponent,
    VerIntermediarioProduccionComponent
  ],
  imports: [
    CommonModule,
    IntermediarioRoutingModule,
    ProgressBarModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    DialogModule,
    DropdownModule
  ],
  providers: [MessageService],
})
export class IntermediarioModule { }
