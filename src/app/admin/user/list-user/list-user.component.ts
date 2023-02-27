import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { StudentService } from '../../servicios/student.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { UserFullDTO } from '../../student/student';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

 //DTO
 selectedCohorte!: UserFullDTO;
 listUsers:UserFullDTO[] = [];
  //variables globales
loading:boolean=false;
 //subcription
 subCohorte!:Subscription;
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
 tipoUsuario=this.usuarioService.definirTipoUsuario();
constructor(private userService:UsuarioService,
    private usuarioService:UsuarioService) { }

ngOnInit(): void {
 this.loadDataUsers();
 //refresh table and delete registro
 this.subDelete = this.userService.refreshTable$.subscribe(()=>{
     this.loadDataUsers();
 });
}

loadDataUsers(){
 this.loading=true;
 this.subCohorte=this.userService.obtenerTodos().subscribe(response=>{
     this.loading=false;
     this.listUsers=response.data;
     console.log(this.listUsers)
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
btnDeletUser(cohorte:UserFullDTO){
 Swal.fire({
     title: '¿ Esta seguro en eliminar ?',
     text: cohorte.username,
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
           this.subDelete=this.userService.eliminarPorId(cohorte.id).subscribe((response)=>{
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

}
