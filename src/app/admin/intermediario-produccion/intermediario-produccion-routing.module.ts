import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntermediarioProduccionComponent } from './intermediario-produccion.component';

const routes: Routes = [
  {
    path: '',
    component: IntermediarioProduccionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntermediarioRoutingModule { }
