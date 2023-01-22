import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostoProduccionComponent } from './costo-produccion.component';

const routes: Routes = [
  {
    path: '',
    component: CostoProduccionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostoProduccionRoutingModule { }
