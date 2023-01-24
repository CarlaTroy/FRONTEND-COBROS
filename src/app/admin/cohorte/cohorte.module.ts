import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CohorteRoutingModule } from './cohorte-routing.module';
import { CreateCohorteComponent } from './create-cohorte/create-cohorte.component';
import { EditCohorteComponent } from './edit-cohorte/edit-cohorte.component';
import { FormCohorteComponent } from './template/form-cohorte/form-cohorte.component';


@NgModule({
  declarations: [
    CreateCohorteComponent,
    EditCohorteComponent,
    FormCohorteComponent
  ],
  imports: [
    CommonModule,
    CohorteRoutingModule
  ]
})
export class CohorteModule { }
