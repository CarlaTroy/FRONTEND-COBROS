import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollementComponent } from './enrollement.component';
import { CreateEnrollementComponent } from './create-enrollement/create-enrollement.component';
import { EditEnrollementComponent } from './edit-enrollement/edit-enrollement.component';

const routes: Routes = [
  { path: '',component: EnrollementComponent},
  { path: "create",component:CreateEnrollementComponent },
  { path: "edit/:id",component:EditEnrollementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollementRoutingModule { }
