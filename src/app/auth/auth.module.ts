import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { TopbarPrincipalComponent } from '../principal/topbar-principal/topbar-principal.component';
import { PrincipalModule } from '../principal/principal.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

import { LoginComponent } from './login/login.component';

@NgModule({
  
    imports: [
        CommonModule,
        AuthRoutingModule,
        PrincipalModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [MessageService],
})
export class AuthModule { }
