import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduccionRoutingModule } from './produccion-routing.module';
import { ProduccionComponent } from './produccion.component';
import { CrearProduccionComponent } from './crear-produccion/crear-produccion.component';
import { EditarProduccionComponent } from './editar-produccion/editar-produccion.component';
import { FormularioProduccionComponent } from './formulario-produccion/formulario-produccion.component';
import { ListarProduccionComponent } from './listar-produccion/listar-produccion.component';

import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import { VerProduccionComponent } from './ver-produccion/ver-produccion.component';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [
    ProduccionComponent,
    CrearProduccionComponent,
    EditarProduccionComponent,
    FormularioProduccionComponent,
    ListarProduccionComponent,
    VerProduccionComponent
  ],
  imports: [
    CommonModule,
    ProduccionRoutingModule,
    ToastModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressBarModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    CalendarModule
  ],
  providers: [MessageService],
})
export class ProduccionModule { }
