import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { EnrollementFullDTO } from '../enrollement';
import { EnrollementService } from '../../servicios/enrollement.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TablePaymentStudentComponent } from '../template/table-payment-student/table-payment-student.component';

@Component({
  providers: [DialogService],
  selector: 'app-list-enrollement',
  templateUrl: './list-enrollement.component.html',
  styleUrls: ['./list-enrollement.component.scss']
})
export class ListEnrollementComponent implements OnInit {

  //DTO
 selectedCohorte!: EnrollementFullDTO;
 listCohorte:EnrollementFullDTO[] = [];
  //variables globales
loading:boolean=false;
 //subcription
 ref!: DynamicDialogRef;
 subCohorte!:Subscription;
 subDelete!:Subscription;
    //toast
    Toast = Swal.mixin({
     toast: true,
     position: 'top-end',
     showConfirmButton: false,
     timer: 3000,
     timerProgressBar: true,
     didOpen: (toast) => {
         toast.addEventListener('mouseenter', Swal.stopTimer)
         toast.addEventListener('mouseleave', Swal.resumeTimer)
     }
 })
constructor(private enrollementService:EnrollementService,
                public dialogService: DialogService,) { }

ngOnInit(): void {
 this.loadDataCourses();
 //refresh table and delete registro
 this.subDelete = this.enrollementService.refreshTable$.subscribe(()=>{
     this.loadDataCourses();
 });
}
loadDataCourses(){
 this.loading=true;
 this.subCohorte=this.enrollementService.getAll().subscribe(response=>{

     this.loading=false;
     console.log('response.data')
     console.log(response.data)
     this.listCohorte=response.data;
   },error=>{
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
btnViewPaypment(enrollement:EnrollementFullDTO){
    this.ref=this.dialogService.open(TablePaymentStudentComponent, {
        header: 'Gestionar pagos del estudiante '+enrollement.student.name+" "+enrollement.student.last_name,
        width: '70%',
        data:enrollement
      });
}
btnDeletEnrollement(cohorte:EnrollementFullDTO){
 Swal.fire({
     title: '¿ Esta seguro en eliminar ?',
     text: "Se eliminar al estudiante "+cohorte.student.name+" "+cohorte.student.last_name + " con su respectiva matricula "+cohorte.cohorte.name,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Confirmar'
   }).then((result) => {
     //Swal.showLoading();
     if(result.isConfirmed){
       Swal.fire({
         title: 'Eliminando...',
         html: 'Espere porfavor...',
         allowEscapeKey: false,
         allowOutsideClick: false,
         didOpen: () => {
           Swal.showLoading(undefined)
           this.subDelete=this.enrollementService.deleteEnrollementId(cohorte.id).subscribe((response)=>{
             if(response.success){
                 this.Toast.fire({
                   icon: 'success',
                   title: response.message
                 })
                 return;
             }
             Swal.fire({
                 icon: 'warning',
                 title: 'Oops...',
                 text: 'Información',
                 footer: response.message
             })
           },error=>{
             Swal.close();
             let message= error.error.message;
             Swal.close();
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: 'Error',
                 footer:message
               })
           })
         }
       });
     }
   })
}

}
