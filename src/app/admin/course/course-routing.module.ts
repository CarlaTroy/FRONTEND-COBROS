import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course.component';
import { CreateCourseComponent } from './create-course/create-course.component';

const routes: Routes = [
    {path: '',component: CourseComponent},
    { path: "create",component:CreateCourseComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
