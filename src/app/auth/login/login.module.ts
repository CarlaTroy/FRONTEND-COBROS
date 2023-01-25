import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { PrincipalModule } from "../../principal/principal.module";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        PrincipalModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule
    ],
    providers: [MessageService],
})
export class LoginModule { }
