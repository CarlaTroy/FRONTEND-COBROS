import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CourseService } from '../../servicios/course.service';
import { CourseCreateDTO } from '../course';
import { FormCourseComponent } from '../template/form-course/form-course.component';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
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
  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
  }
  createCourse(courseCreate:CourseCreateDTO){
    let timerInterval;
    Swal.fire({
        allowOutsideClick: false,
        text: 'Espere por favor...',
        timerProgressBar: false,
    });
    Swal.showLoading()
    this.courseService.create(courseCreate).subscribe(response=>{
        Swal.close();
        if(response.succes){
            this.Toast.fire({
                icon: 'success',
                title: response.message
            })
            return;
        }
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
