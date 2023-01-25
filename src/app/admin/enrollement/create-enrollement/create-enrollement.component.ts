import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { EnrollementService } from '../../servicios/enrollement.service';
import { StudentService } from '../../servicios/student.service';
import { StudentFullDTO } from '../../student/student';
import { EnrollementCreateDTO } from '../enrollement';
import { CourseFullDTO } from '../../course/course';
import { CohorteService } from '../../servicios/cohorte.service';
import { CohorteFullDTO } from '../../cohorte/cohorte';

@Component({
  selector: 'app-create-enrollement',
  templateUrl: './create-enrollement.component.html',
  styleUrls: ['./create-enrollement.component.scss']
})
export class CreateEnrollementComponent implements OnInit {

  listUsers:StudentFullDTO[] = [];
  listCohorte:CohorteFullDTO[] = [];
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
constructor(private usuarioService:StudentService,
  private cohorteService: CohorteService,
              private enrollementService:EnrollementService) { }

ngOnInit(): void {
  this.loadDataStudents();
  this.loadDataCohorte();
}
loadDataStudents(){
  this.subCourse=this.usuarioService.getAll().subscribe(response=>{
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

loadDataCohorte(){
  this.subCourse=this.cohorteService.getAll().subscribe(response=>{
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
createStudent(courseCreate:EnrollementCreateDTO){
  Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      timerProgressBar: false,
  });
  Swal.showLoading()
  this.enrollementService.create(courseCreate).subscribe(response=>{
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
