import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { ListReportComponent } from './list-report/list-report.component';
import { ReportComponent } from './report.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputDemoModule } from 'src/app/demo/components/uikit/input/inputdemo.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    ListReportComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    TableModule,
    ToastModule,
    ButtonModule,
    InputDemoModule,
    ProgressBarModule
  ]
})
export class ReportModule { }
