import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { UserCreateDTO } from '../user';
import { UsuarioService } from '../../servicios/usuario.service';
import { UserFullDTO } from '../../student/student';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  listUsers:UserFullDTO[] = [];
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
constructor(private usuarioService:UsuarioService) { }

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
createStudent(userCreate:UserCreateDTO){
  Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      timerProgressBar: false,
  });
  Swal.showLoading()
  this.usuarioService.crear(userCreate).subscribe(response=>{
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
