import { distinct, of, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportService } from '../../servicios/report.service';
import { EnrollementFullDTO, PaymentFullDTO } from '../../enrollement/enrollement';
import Swal from 'sweetalert2';
import { ReportDTOFullMapper } from '../report';

@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.scss']
})
export class ListReportComponent implements OnInit {
    subReport!:Subscription;
    listReport!:EnrollementFullDTO[];
    listPaymentezAll!:PaymentFullDTO[];
    reporteMapper!:ReportDTOFullMapper[];
    loading:boolean=true;
    selectedPayment!: PaymentFullDTO;
    subPayment!:Subscription;
  constructor(private reportService:ReportService) { }

  ngOnInit(): void {
    this.loadDataReport();

  }


  totalCurso(report:EnrollementFullDTO){
    // si existen cuenotas entonces ha pagado a credito
    if(report.tipe_pay.codigo=="001"){
        //aplicar si tiene descuento
        return report.cohorte.cost_credit-((report.cohorte.cost_credit)*(report.discount/100));
    }
    return report.cohorte.cost_effective-((report.cohorte.cost_effective)*(report.discount/100));
  }

  coutasPagas(report:EnrollementFullDTO):number{
    let cont=0;
    if(report.tipe_pay.codigo=="001"){
       this.listPaymentezAll.forEach(paymentez=>{
        if(paymentez.enrollement.id==report.id){
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
            if(paymentez.enrollement.id==report.id){
                //pagago
                if(paymentez.status_pay.codigo=='001'){
                    saldo+=Number(paymentez.amount);
                }
            }
        });
        let costoCredito=Number(report.cohorte.cost_credit-(report.cohorte.cost_credit*(report.discount/100)));
        return costoCredito-saldo;
    }
    return  saldo;
  }
  pensiones(report:EnrollementFullDTO){
    let cont=0;
    if(report.tipe_pay.codigo=="001"){
        this.listPaymentezAll.forEach(paymentez=>{
         if(paymentez.enrollement.id==report.id){
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
        if(paymentez.enrollement.id==report.id){
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
        this.subPayment=this.reportService.getAllPaymentez().subscribe(response=>{
            console.log(response);
            this.listPaymentezAll=response.data;
            this.reporteMapper=[];
            //mapear la data para enviar al reporte
            this.listReport.forEach(elemento=>{
                const cuotas=this.coutasPagas(elemento);
                const estado=this.estadoPago(elemento);
                const pensiones= this.pensiones(elemento);
                const saldoPendiente=this.saldoPendiente(elemento);
                const valorTotal=this.totalCurso(elemento);
                let auxReport:ReportDTOFullMapper={
                    id:elemento.id,
                    nombresCompletos:elemento.student.name+' - '+elemento.student.last_name,
                    cursoCohorte:elemento.cohorte.name+' '+elemento.cohorte.course.name,
                    cuotas:cuotas.toString()+"/"+elemento.cuotas.toString(),
                    estado:estado,
                    pensiones:pensiones,
                    saldoPendiente:saldoPendiente,
                    valorTotal:valorTotal
                };
                this.loading=false;
                this.reporteMapper.push(auxReport);
            });
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
  OnDestroy(){
    if(this.subPayment){
        this.subPayment.unsubscribe();
    }
  }
}
