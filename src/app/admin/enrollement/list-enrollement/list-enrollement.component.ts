import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { EnrollementFullDTO } from '../enrollement';
import { EnrollementService } from '../../servicios/enrollement.service';

@Component({
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
constructor(private enrollementService:EnrollementService) { }

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
btnDeletStudent(cohorte:EnrollementFullDTO){
 Swal.fire({
     title: '¿ Esta seguro en eliminar ?',
     text: cohorte.cash.toString(),
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
