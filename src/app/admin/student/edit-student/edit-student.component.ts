import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { StudentCreateDTO, StudentFullDTO, UserFullDTO } from '../student';
import { StudentService } from '../../servicios/student.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
//toast
modelStudentFull!:StudentFullDTO;
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
private studentService:StudentService,
private usuarioService:UsuarioService,
           private activatedRoute:ActivatedRoute) { }

ngOnInit(): void {
 this.getStudentId();
}
getStudentId(){
 this.activatedRoute.params.subscribe((response:any)=>{
     this.sub = this.studentService.getStudentId(Number(response.id)).subscribe(response=>{
         if(response.success){
             this.modelStudentFull=response.data;
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
         Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'Error',
             footer: error.error?.message
         })
     });
 });
}

    editStudent(courseCreate:StudentCreateDTO){
        //console.log('courseCreate')
        //console.log(courseCreate)
        Swal.fire({
            allowOutsideClick: false,
            text: 'Espere por favor...',
            timerProgressBar: false,
        });
        Swal.showLoading()
        this.studentService.edit(courseCreate,this.modelStudentFull.id).subscribe(response=>{
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
                footer: error.error?.message
            })
        });
    }

    OnDestroy(){
        if(this.subCourse){
            this.subCourse.unsubscribe();
        }
    }
}
