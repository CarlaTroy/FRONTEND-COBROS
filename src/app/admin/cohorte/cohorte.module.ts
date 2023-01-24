import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CohorteRoutingModule } from './cohorte-routing.module';
import { CreateCohorteComponent } from './create-cohorte/create-cohorte.component';
import { EditCohorteComponent } from './edit-cohorte/edit-cohorte.component';
import { FormCohorteComponent } from './template/form-cohorte/form-cohorte.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDemoModule } from 'src/app/demo/components/uikit/input/inputdemo.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { ListCohorteComponent } from './list-cohorte/list-cohorte.component';


@NgModule({
  declarations: [
    ListCohorteComponent,
    CreateCohorteComponent,
    EditCohorteComponent,
    FormCohorteComponent,
  ],
  imports: [
    CommonModule,
    CohorteRoutingModule,
    ButtonModule,
    TableModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    InputDemoModule,
    ProgressBarModule,
    DropdownModule,

    //FormLayoutComponent
  ]
})
export class CohorteModule { }
