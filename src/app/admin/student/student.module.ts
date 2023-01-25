import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { FormStudentComponent } from './template/form-student/form-student.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDemoModule } from 'src/app/demo/components/uikit/input/inputdemo.module';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    StudentComponent,
    CreateStudentComponent,
    EditStudentComponent,
    ListStudentComponent,
    FormStudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ButtonModule,
    TableModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    InputDemoModule,
    ProgressBarModule,
  ]
})
export class StudentModule { }
