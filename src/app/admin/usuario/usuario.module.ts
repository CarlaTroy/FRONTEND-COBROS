import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';

import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {PasswordModule} from 'primeng/password';
import {InputSwitchModule} from 'primeng/inputswitch';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';



@NgModule({
  declarations: [
    UsuarioComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    FormularioUsuarioComponent,
    ListarUsuarioComponent,
    VerUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressBarModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    PasswordModule,
    InputSwitchModule
  ],
  providers: [MessageService],
})
export class UsuarioModule { }
