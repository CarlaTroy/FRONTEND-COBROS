import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { StudentCreateDTO, StudentFullDTO } from '../student';
import { StudentService } from '../../servicios/student.service';
import { UsuarioDTO } from '../../usuario/usuario.model';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
//toast
modelCohorteseFull!:StudentFullDTO;
listUsers:UsuarioDTO[] = [];
//listCourse!: CourseFullDTO[];
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
private cohorteService:StudentService,
private usuarioService:UsuarioService,
           private activatedRoute:ActivatedRoute) { }

ngOnInit(): void {
 this.getCourseId();
 this.loadDataCourses();
}
getCourseId(){
 this.activatedRoute.params.subscribe((response:any)=>{
     this.sub = this.cohorteService.getStudentId(Number(response.id)).subscribe(response=>{
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
    this.subCourse=this.usuarioService.obtenerTodos().subscribe(response=>{
      console.log('response.data')
      console.log(response.data)
        this.listUsers=response.data;
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

editCourse(courseCreate:StudentCreateDTO){
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
