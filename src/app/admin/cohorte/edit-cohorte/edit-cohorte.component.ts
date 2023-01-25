import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CohorteCreateDTO, CohorteFullDTO } from '../cohorte';
import { CohorteService } from '../../servicios/cohorte.service';
@Component({
  selector: 'app-edit-cohorte',
  templateUrl: './edit-cohorte.component.html',
  styleUrls: ['./edit-cohorte.component.scss']
})
export class EditCohorteComponent implements OnInit {

 //toast
 modelCohorteseFull!:CohorteFullDTO;
 //suscription
 sub!:Subscription;
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
 constructor(private courseService:CohorteService,
             private activatedRoute:ActivatedRoute) { }

 ngOnInit(): void {
   this.getCourseId();
 }
 getCourseId(){
   this.activatedRoute.params.subscribe((response:any)=>{
       this.sub = this.courseService.getCohorteId(Number(response.id)).subscribe(response=>{
           if(response.success){
               this.modelCohorteseFull=response.data;
               return;
           }
           Swal.fire({
               icon: 'warning',
               title: 'Oops...',
               text: 'Información',
               footer: response.message
           })
       },error=>{
           Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Error',
               footer: error.message
           })
       });
   });
 }
 editCourse(courseCreate:CohorteCreateDTO){
  console.log('courseCreate')
  console.log(courseCreate)
   Swal.fire({
       allowOutsideClick: false,
       text: 'Espere por favor...',
       timerProgressBar: false,
   });
   Swal.showLoading()
   this.courseService.edit(courseCreate,this.modelCohorteseFull.id).subscribe(response=>{
       Swal.close();
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
       console.log(error);
       Swal.close();
       Swal.fire({
           icon: 'error',
           title: 'Oops...',
           text: 'Error',
           footer: error.message
         })
   });
 }

}
