import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParroquiaComponent } from './parroquia.component';

const routes: Routes = [
  {
    path: '',
    component: ParroquiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParroquiaRoutingModule { }
