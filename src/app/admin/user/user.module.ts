import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { FormUserComponent } from './template/form-user/form-user.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDemoModule } from 'src/app/demo/components/uikit/input/inputdemo.module';
import { ProgressBarModule } from 'primeng/progressbar';
import {PasswordModule} from 'primeng/password';
import {InputSwitchModule} from 'primeng/inputswitch';

@NgModule({
  declarations: [
    UserComponent,
    CreateUserComponent,
    EditUserComponent,
    ListUserComponent,
    FormUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ButtonModule,
    TableModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    InputDemoModule,
    ProgressBarModule,
    PasswordModule,
    InputSwitchModule

  ]
})
export class UserModule { }
