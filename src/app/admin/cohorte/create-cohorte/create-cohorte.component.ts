import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CourseFullDTO } from '../../course/course';
import { CohorteService } from '../../servicios/cohorte.service';
import { CourseService } from '../../servicios/course.service';
import { CohorteCreateDTO } from '../cohorte';

@Component({
  selector: 'app-create-cohorte',
  templateUrl: './create-cohorte.component.html',
  styleUrls: ['./create-cohorte.component.scss']
})
export class CreateCohorteComponent implements OnInit {
    listCourse:CourseFullDTO[] = [];
    subCourse!:Subscription;
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
  constructor(private courseService:CourseService,
                private cohorteService:CohorteService) { }

  ngOnInit(): void {
    this.loadDataCourses();
  }
  loadDataCourses(){
    this.subCourse=this.courseService.getAll().subscribe(response=>{
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
  createCohorte(courseCreate:CohorteCreateDTO){
    Swal.fire({
        allowOutsideClick: false,
        text: 'Espere por favor...',
        timerProgressBar: false,
    });
    Swal.showLoading()
    this.cohorteService.create(courseCreate).subscribe(response=>{
        Swal.close();
        if(response.succes){
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
