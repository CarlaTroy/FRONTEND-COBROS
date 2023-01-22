import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoresRoutingModule } from './productores-routing.module';
import { ProductoresComponent } from './productores.component';
import { CrearProductorComponent } from './crear-productor/crear-productor.component';
import { EditarProductorComponent } from './editar-productor/editar-productor.component';
import { FormularioProductorComponent } from './formulario-productor/formulario-productor.component';
import { ListarProductorComponent } from './listar-productor/listar-productor.component';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { VerProductorComponent } from './ver-productor/ver-productor.component';

@NgModule({
  declarations: [
    ProductoresComponent,
    CrearProductorComponent,
    EditarProductorComponent,
    FormularioProductorComponent,
    ListarProductorComponent,
    VerProductorComponent
  ],
  imports: [
    CommonModule,
    ProductoresRoutingModule,
    ToastModule,
    ProgressBarModule,
    DropdownModule,
    InputTextModule,
    FormsModule, 
    ReactiveFormsModule,
    TableModule,
    ButtonModule
  ]
})
export class ProductoresModule { }
