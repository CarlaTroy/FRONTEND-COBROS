import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AdminComponent } from "./admin.component";
import { AppConfigModule } from '../core/skai/config/config.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { CohorteComponent } from './cohorte/cohorte.component';




@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AdminComponent,
        //CohorteComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
    exports: [AdminComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        SweetAlert2Module,
        MenubarModule,
        MenuModule,
        ButtonModule,
        DynamicDialogModule,
        DialogModule,
        ToastModule
    ]
})
export class AdminModule { }
