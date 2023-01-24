import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CourseService } from '../../servicios/course.service';
import { CourseCreateDTO, CourseFullDTO } from '../course';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  //toast
  modelCourseFull!:CourseFullDTO;
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
  constructor(private courseService:CourseService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCourseId();
  }
  getCourseId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.sub = this.courseService.getCourseId(Number(response.id)).subscribe(response=>{
            if(response.success){
                this.modelCourseFull=response.data;
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
  editCourse(courseCreate:CourseCreateDTO){
    Swal.fire({
        allowOutsideClick: false,
        text: 'Espere por favor...',
        timerProgressBar: false,
    });
    Swal.showLoading()
    this.courseService.edit(courseCreate,this.modelCourseFull.id).subscribe(response=>{
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
