import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CohorteFullDTO } from 'src/app/admin/cohorte/cohorte';
import { PaymentService } from 'src/app/admin/servicios/payment.service';
import { StatusPayService } from 'src/app/admin/servicios/status-pay.service';
import Swal from 'sweetalert2';
import { EnrollementFullDTO, PaymentEditDTO, PaymentFullDTO, StatusPayFullDTO } from '../../enrollement';

@Component({
  providers: [MessageService],
  selector: 'app-table-payment-student',
  templateUrl: './table-payment-student.component.html',
  styleUrls: ['./table-payment-student.component.scss']
})
export class TablePaymentStudentComponent implements OnInit {
  modelPayments!:PaymentFullDTO[];
  modelEnrollement!:EnrollementFullDTO;
  modelStatusPays!:StatusPayFullDTO[];
  clonedPayments: { [s: string]: PaymentFullDTO; } = {};
  cohorteFull!:CohorteFullDTO;
  coustReal!:number;
  contCoursre:number=1;
  constructor(public config: DynamicDialogConfig,
                public ref: DynamicDialogRef,
                private messageService: MessageService,
                private statusPayService:StatusPayService,
                private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.getPaymentsEnrrollement();
    this.getStatusPays();
  }


  getStatusPays(){
    this.statusPayService.getAll().subscribe(response=>{
        if(response.success){
            this.modelStatusPays=response.data;
            return;
        }
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Información',
            footer: response.message
        })

        console.log(response);
    },error=>{
        console.log(error);
        let message= error.error.message;
        Swal.close();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error',
            footer:message
        })
    });
  }
  sobrantePagar(monto:number,index:number){
     return this.coustReal-(monto*index);
  }
  getPaymentsEnrrollement(){
    this.modelEnrollement=this.config.data;
    this.cohorteFull=this.modelEnrollement.cohorte;
    this.coustReal=this.cohorteFull.cost_credit-(this.cohorteFull.cost_credit*(this.modelEnrollement.discount/100));
    this.paymentService.getPaymentsEnrollemtId(this.modelEnrollement.id).subscribe(response=>{
        console.log(response);
        if(response.success){
            this.modelPayments=response.data;
            return;
        }
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Información',
            footer: response.message
        })
    },error=>{
        console.log(error);
        let message= error.error.message;
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error',
            footer:message
        })
    });
  }
  closeModal(){
    this.ref.close();
  }
  onRowEditInit(product: any) {
    this.clonedPayments[product.id] = {...product};
  }

  onRowEditSave(payment: PaymentFullDTO) {
    let paymentEdit:PaymentEditDTO={
        date_pay:payment.date_pay,
        status_pay_id:payment.status_pay.id,
    }
    this.paymentService.edit(paymentEdit,payment.id).subscribe(response=>{
        console.log(response);
        if(response.success){
            this.messageService.add({severity:'success', summary: 'Success', detail:response.message});
            return;
        }
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Información',
            footer: response.message
        })
    },error=>{
        console.log(error);
    });
 }
 onRowEditCancel(payment: PaymentFullDTO, index: number) {
    this.modelPayments[index] = this.clonedPayments[payment.id];
    delete this.clonedPayments[payment.id];
 }
}
