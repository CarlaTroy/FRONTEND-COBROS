import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollementRoutingModule } from './enrollement-routing.module';
import { EnrollementComponent } from './enrollement.component';
import { CreateEnrollementComponent } from './create-enrollement/create-enrollement.component';
import { EditEnrollementComponent } from './edit-enrollement/edit-enrollement.component';
import { ListEnrollementComponent } from './list-enrollement/list-enrollement.component';
import { FormEnrollementComponent } from './template/form-enrollement/form-enrollement.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDemoModule } from 'src/app/demo/components/uikit/input/inputdemo.module';
import { ProgressBarModule } from 'primeng/progressbar';
import {DialogModule} from 'primeng/dialog'
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { MessageService } from 'primeng/api';
import { TablePaymentStudentComponent } from './template/table-payment-student/table-payment-student.component';
import {BadgeModule} from 'primeng/badge';

@NgModule({
  declarations: [
    EnrollementComponent,
    CreateEnrollementComponent,
    EditEnrollementComponent,
    ListEnrollementComponent,
    FormEnrollementComponent,
    TablePaymentStudentComponent
  ],
  imports: [
    CommonModule,
    EnrollementRoutingModule,
    ButtonModule,
    TableModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    InputDemoModule,
    ProgressBarModule,
    DialogModule,
    OverlayPanelModule,
    BadgeModule
  ],
  providers: [MessageService]
})
export class EnrollementModule { }
