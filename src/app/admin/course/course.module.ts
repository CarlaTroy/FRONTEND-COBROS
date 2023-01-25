import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormCourseComponent } from './template/form-course/form-course.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDemoModule } from 'src/app/demo/components/uikit/input/inputdemo.module';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { ProgressBarModule } from 'primeng/progressbar';
@NgModule({
  declarations: [
    CourseComponent,
    ListCoursesComponent,
    FormCourseComponent,
    CreateCourseComponent,
    EditCourseComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ButtonModule,
    TableModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    InputDemoModule,
    ProgressBarModule,
  ],
  providers: [],
})
export class CourseModule { }
