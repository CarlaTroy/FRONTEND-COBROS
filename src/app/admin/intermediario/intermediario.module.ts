import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntermediarioRoutingModule } from './intermediario-routing.module';
import { IntermediarioComponent } from './intermediario.component';
import { CrearIntermediarioComponent } from './crear-intermediario/crear-intermediario.component';
import { EditarIntermediarioComponent } from './editar-intermediario/editar-intermediario.component';
import { FormularioIntermediarioComponent } from './formulario-intermediario/formulario-intermediario.component';
import { ListarIntermediarioComponent } from './listar-intermediario/listar-intermediario.component';
import { VerIntermediarioComponent } from './ver-intermediario/ver-intermediario.component';
import { MessageService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    IntermediarioComponent,
    CrearIntermediarioComponent,
    EditarIntermediarioComponent,
    FormularioIntermediarioComponent,
    ListarIntermediarioComponent,
    VerIntermediarioComponent
  ],
  imports: [
    CommonModule,
    IntermediarioRoutingModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressBarModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class IntermediarioModule { }
