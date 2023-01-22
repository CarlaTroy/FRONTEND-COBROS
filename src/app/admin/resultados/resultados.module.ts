import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosRoutingModule } from './resultados-routing.module';
import { ResultadosComponent } from './resultados.component';
import { CrearResultadosComponent } from './crear-resultados/crear-resultados.component';
import { EditarResultadosComponent } from './editar-resultados/editar-resultados.component';
import { FormularioResultadosComponent } from './formulario-resultados/formulario-resultados.component';
import { ListarResultadosComponent } from './listar-resultados/listar-resultados.component';
import { VerResultadosComponent } from './ver-resultados/ver-resultados.component';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import {ChartModule} from 'primeng/chart';


@NgModule({
  declarations: [
    ResultadosComponent,
    CrearResultadosComponent,
    EditarResultadosComponent,
    FormularioResultadosComponent,
    ListarResultadosComponent,
    VerResultadosComponent
  ],
  imports: [
    CommonModule,
    ResultadosRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ToastModule,
    ProgressBarModule,
    TableModule,
    ChartModule
  ]
})
export class ResultadosModule { }
