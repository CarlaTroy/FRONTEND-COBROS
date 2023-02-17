import { distinct, of, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../servicios/report.service';
import { EnrollementFullDTO, PaymentFullDTO } from '../../enrollement/enrollement';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.scss']
})
export class ListReportComponent implements OnInit {
    subReport!:Subscription;
    listReport!:EnrollementFullDTO[];
    listPaymentezAll!:PaymentFullDTO[];
    loading!:boolean;
    selectedPayment!: PaymentFullDTO;
  constructor(private reportService:ReportService) { }

  ngOnInit(): void {
    this.loadDataReport();
    this.getAllPaymentez();
  }
  getAllPaymentez(){
    this.reportService.getAllPaymentez().subscribe(response=>{
        this.listPaymentezAll=response.data;
    },error=>{
        console.log(error);
    });
  }

  totalCurso(report:EnrollementFullDTO){
    // si existen cuenotas entonces ha pagado a credito
    if(report.tipe_pay.codigo=="001"){
        return report.cohorte.cost_credit;
    }
    return report.cohorte.cost_effective;
  }

  coutasPagas(report:EnrollementFullDTO){
    let cont=0;
    if(report.tipe_pay.codigo=="001"){
       this.listPaymentezAll.forEach(paymentez=>{
        if(paymentez.enrollement.id=report.id){
            //pagago
            if(paymentez.status_pay.codigo=='001'){
                cont++;
            }
        }
       });
       return cont;
    }
    return cont;
  }
  saldoPendiente(report:EnrollementFullDTO){
    let saldo=0;
    if(report.tipe_pay.codigo=="001"){
       this.listPaymentezAll.forEach(paymentez=>{
            if(paymentez.enrollement.id=report.id){
                //pagago
                if(paymentez.status_pay.codigo=='001'){
                    saldo+=Number(paymentez.amount);
                }
            }
        });
        let costoCredito=Number(report.cohorte.cost_credit);
        return costoCredito-saldo;
    }
    return  saldo;
  }
  pensiones(report:EnrollementFullDTO){
    let cont=0;
    if(report.tipe_pay.codigo=="001"){
        this.listPaymentezAll.forEach(paymentez=>{
         if(paymentez.enrollement.id=report.id){
            var diaPago = new Date(paymentez.date_pay);
            var diaLimite = new Date(paymentez.date_limit);
             //pagago
             if(diaPago>diaLimite ){
                 cont++;
             }
         }
        });
        if(cont==0){
         return 'AL DIA';
        }
        return cont+' ATRASO';
     }
     return  'AL DIA';
  }
  estadoPago(report:EnrollementFullDTO){
    let cont=0;
    if(report.tipe_pay.codigo=="001"){
       this.listPaymentezAll.forEach(paymentez=>{
        if(paymentez.enrollement.id=report.id){
            //pagago
            if(paymentez.status_pay.codigo=='001'){
                cont++;
            }
        }
       });
       if(cont==report.cuotas){
        return 'PAGADO';
       }
       return 'NO PAGADO';
    }
    return  'PAGADO';
  }
  loadDataReport(){
    this.subReport=this.reportService.getAll().subscribe(response=>{
        console.log(response);
        this.listReport=response.data;
        /* const dataDistinc=of(response.data.enrollement);
        debugger
        dataDistinc.pipe(
            distinct()
        ).subscribe(value=>console.log(value))
 */
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
}
