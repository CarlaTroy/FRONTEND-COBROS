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
  saldoPendiente(report:PaymentFullDTO){
    if(report.enrollement.cuotas>0){
        return report.enrollement.cohorte.cost_credit;
    }
    return  0;
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
