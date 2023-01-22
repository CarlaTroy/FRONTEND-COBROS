import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntermediarioComponent } from './intermediario.component';

const routes: Routes = [
  {
    path: '',
    component: IntermediarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntermediarioRoutingModule { }
