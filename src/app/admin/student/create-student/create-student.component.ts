import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { StudentCreateDTO } from '../student';
import { StudentService } from '../../servicios/student.service';
import { UsuarioDTO } from '../../usuario/usuario.model';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  listUsers:UsuarioDTO[] = [];
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
constructor(private usuarioService:UsuarioService,
              private cohorteService:StudentService) { }

ngOnInit(): void {
  this.loadDataCourses();
}
loadDataCourses(){
  this.subCourse=this.usuarioService.obtenerTodos().subscribe(response=>{
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
createStudent(courseCreate:StudentCreateDTO){
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
