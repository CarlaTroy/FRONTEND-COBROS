import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { EnrollementService } from '../../servicios/enrollement.service';
import { StudentService } from '../../servicios/student.service';
import { StudentFullDTO } from '../../student/student';
import { EnrollementCreateDTO, TypePaysFullDTO } from '../enrollement';
import { CourseFullDTO } from '../../course/course';
import { CohorteService } from '../../servicios/cohorte.service';
import { CohorteFullDTO } from '../../cohorte/cohorte';
import { TypePaysService } from '../../servicios/type.pays.service';

@Component({
  selector: 'app-create-enrollement',
  templateUrl: './create-enrollement.component.html',
  styleUrls: ['./create-enrollement.component.scss']
})
export class CreateEnrollementComponent implements OnInit {

  listUsers:StudentFullDTO[] = [];
  listCohorte:CohorteFullDTO[] = [];
  listTypePays:TypePaysFullDTO[] = [];
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
  private typePaysService: TypePaysService,
              private enrollementService:EnrollementService) { }

ngOnInit(): void {
  this.loadDataStudents();
  this.loadDataCohorte();
  this.loadDataTypePays()
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


loadDataTypePays(){
  this.subCourse=this.typePaysService.getAll().subscribe(response=>{
    console.log(response.data)
      this.listTypePays=response.data;
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
