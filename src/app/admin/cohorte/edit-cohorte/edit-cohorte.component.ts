import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CohorteCreateDTO, CohorteFullDTO } from '../cohorte';
import { CohorteService } from '../../servicios/cohorte.service';
import { CourseFullDTO } from '../../course/course';
import { CourseService } from '../../servicios/course.service';
@Component({
  selector: 'app-edit-cohorte',
  templateUrl: './edit-cohorte.component.html',
  styleUrls: ['./edit-cohorte.component.scss']
})
export class EditCohorteComponent implements OnInit {

 //toast
 modelCohorteseFull!:CohorteFullDTO;
  listCourse!: CourseFullDTO[];
 //suscription
 sub!:Subscription;
 subCourse!:Subscription;
 
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
 constructor(
  private cohorteService:CohorteService,
  private courseService:CourseService,
             private activatedRoute:ActivatedRoute) { }

 ngOnInit(): void {
   this.getCourseId();
   this.loadDataCourses()
 }
 getCourseId(){
   this.activatedRoute.params.subscribe((response:any)=>{
       this.sub = this.cohorteService.getCohorteId(Number(response.id)).subscribe(response=>{
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

 loadDataCourses(){
  this.subCourse=this.courseService.getAll().subscribe(response=>{
    console.log(response.data)
      this.listCourse=response.data;
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

 editCourse(courseCreate:CohorteCreateDTO){
  //console.log('courseCreate')
  //console.log(courseCreate)
   Swal.fire({
       allowOutsideClick: false,
       text: 'Espere por favor...',
       timerProgressBar: false,
   });
   Swal.showLoading()
   this.cohorteService.edit(courseCreate,this.modelCohorteseFull.id).subscribe(response=>{
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

 OnDestroy(){
  if(this.subCourse){
      this.subCourse.unsubscribe();
  }
}
}
