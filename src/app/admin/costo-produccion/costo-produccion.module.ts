import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CostoProduccionRoutingModule } from './costo-produccion-routing.module';
import { CostoProduccionComponent } from './costo-produccion.component';
import {CalendarModule} from 'primeng/calendar';
import { CrearCostoProdComponent } from './crear-costo-prod/crear-costo-prod.component';
import { EditarCostoProdComponent } from './editar-costo-prod/editar-costo-prod.component';
import { FormularioCostoProdComponent } from './formulario-costo-prod/formulario-costo-prod.component';
import { ListarCostoProdComponent } from './listar-costo-prod/listar-costo-prod.component';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { VerCostoProdComponent } from './ver-costo-prod/ver-costo-prod.component';

@NgModule({
  declarations: [
    CostoProduccionComponent,
    CrearCostoProdComponent,
    EditarCostoProdComponent,
    FormularioCostoProdComponent,
    ListarCostoProdComponent,
    VerCostoProdComponent
  ],
  imports: [
    CommonModule,
    CostoProduccionRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ToastModule,
    ProgressBarModule,
    TableModule,
  ]
})
export class CostoProduccionModule { }
