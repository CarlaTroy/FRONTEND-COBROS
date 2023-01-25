import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { TopbarPrincipalComponent } from './topbar-principal/topbar-principal.component';
import { ObjetivosComponent } from './objetivos/objetivos.component';
import { GrupoInvestigacionComponent } from './grupo-investigacion/grupo-investigacion.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    PrincipalComponent,
    TopbarPrincipalComponent,
    ObjetivosComponent,
    GrupoInvestigacionComponent,
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    MenuModule,
    ButtonModule,
    DynamicDialogModule,
    DialogModule,
    ToastModule
  ],
  exports: [TopbarPrincipalComponent]
})
export class PrincipalModule { }
