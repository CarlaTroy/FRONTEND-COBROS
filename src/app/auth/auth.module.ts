import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

import { LoginComponent } from './login/login.component';
import { TopbarPrincipalComponent } from '../topbar-principal/topbar-principal.component';

@NgModule({

    imports: [
        CommonModule,
        AuthRoutingModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,

    ],
    providers: [MessageService],
})
export class AuthModule { }
