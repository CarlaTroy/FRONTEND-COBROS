import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CohorteFullDTO } from 'src/app/admin/cohorte/cohorte';
import { PaymentService } from 'src/app/admin/servicios/payment.service';
import { StatusPayService } from 'src/app/admin/servicios/status-pay.service';
import Swal from 'sweetalert2';
import { EnrollementFullDTO, PaymentFullDTO, StatusPayFullDTO } from '../../enrollement';

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
  paymentRow:any;
  clonedProducts: { [s: string]: any; } = {};
  products2!: any[];
  cohorteFull!:CohorteFullDTO;
  coustReal!:number;
  contCoursre:number=1;
  drpOption$:any;
  constructor(public config: DynamicDialogConfig,
                public ref: DynamicDialogRef,
                private messageService: MessageService,
                private statusPayService:StatusPayService,
                private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.getPaymentsEnrrollement();
    this.getStatusPays();
  }
  contMount(cuotasNum:number){
    let pendientePagar=this.coustReal*(cuotasNum-this.contCoursre);
    this.contCoursre++;
    return pendientePagar;
  }
  onChange(op: StatusPayFullDTO){
    let statusPay:StatusPayFullDTO;
    return statusPay={
        id:op.id,
        name:op.name,
        codigo:op.codigo
    }
  }
  getStatusPays(){
    this.statusPayService.getAll().subscribe(response=>{
        if(response.success){
            this.modelStatusPays=response.data;
/*             this.drpOption$ = this.ddOptionSrv.getDrpOption().pipe(share())

            this.drValue$ = this.drpOption$.pipe(
              switchMapTo(this.ddValueSrv.getDrpModelVal()),
            ) */
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
        Swal.close();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error',
            footer:message
        })
    });
  }
  closeModal(){
    //this.dialogService.cerrarModal();
    this.ref.close();
  }
  onRowEditInit(product: any) {
    this.clonedProducts[product.id] = {...product};
  }

  onRowEditSave(product: PaymentFullDTO) {
    if (product.price > 0) {
        delete this.clonedProducts[product.id];
        this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
    }
    else {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
    }
 }
 onRowEditCancel(product: any, index: number) {
    this.products2[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
 }
}
