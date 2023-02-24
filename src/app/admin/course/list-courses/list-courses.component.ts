import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CourseService } from '../../servicios/course.service';
import { CourseFullDTO } from '../course';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss']
})
export class ListCoursesComponent implements OnInit {
    //DTO
    selectedCourse!: CourseFullDTO;
    listCourse:CourseFullDTO[] = [];
    //variables globales
   loading:boolean=false;
   //subcription
   subCourse!:Subscription;
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
  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
    this.loadDataCourses();
    //refresh table and delete registro
    this.subDelete = this.courseService.refreshTable$.subscribe(()=>{
        this.loadDataCourses();
    });
  }
  loadDataCourses(){
    this.loading=true;
    this.subCourse=this.courseService.getAll().subscribe(response=>{
        this.loading=false;
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
  btnDeleteCourse(course:CourseFullDTO){
    Swal.fire({
        title: '¿ Esta seguro en eliminar ?',
        text: course.name,
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
              this.subDelete=this.courseService.deleteCourseId(course.id).subscribe((response)=>{
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
  ngOnDestroy(): void {
    if(this.subCourse){
      this.subCourse.unsubscribe();
    }
  }
}
