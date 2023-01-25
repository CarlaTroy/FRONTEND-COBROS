import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CohorteComponent } from './cohorte.component';
import { CreateCohorteComponent } from './create-cohorte/create-cohorte.component';
import { EditCohorteComponent } from './edit-cohorte/edit-cohorte.component';

const routes: Routes = [
    { path: '',component: CohorteComponent},
    { path: "create",component:CreateCohorteComponent },
    { path: "edit/:id",component:EditCohorteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CohorteRoutingModule { }
