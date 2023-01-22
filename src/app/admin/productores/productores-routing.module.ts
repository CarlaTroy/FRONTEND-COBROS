import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoresComponent } from './productores.component';

const routes: Routes = [
  {
    path: '',
    component: ProductoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoresRoutingModule { }
