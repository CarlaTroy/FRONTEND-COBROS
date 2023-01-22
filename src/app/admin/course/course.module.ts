import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [
    CourseComponent,
    ListCoursesComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class CourseModule { }
