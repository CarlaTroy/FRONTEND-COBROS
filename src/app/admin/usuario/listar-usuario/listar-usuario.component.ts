import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { LitarUsuarioDTO, UsuarioDTO } from '../usuario.model';
import { UsuarioService } from '../../servicios/usuario.service';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { VerUsuarioComponent } from '../ver-usuario/ver-usuario.component';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit, OnDestroy  {
   //instancias
   selectedCustomer!: UsuarioDTO;
   listarUsuarios:LitarUsuarioDTO[] = [];
   //variables globales
   loading:boolean=false;
 
   //suscription
   ref!: DynamicDialogRef;
   subCargarUsuarios!:Subscription;
   subEliminarUsuario!:Subscription;
   subRefresh!:Subscription;
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
    public dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.subRefresh = this.usuarioService.refresh$.subscribe(()=>{  
      this.cargarUsuarios();
    });
  }
  cargarUsuarios():void{
    this.subCargarUsuarios=this.usuarioService.obtenerTodos().subscribe(usuarios=>{
      console.log(usuarios.data);
      this.loading=false;
      this.listarUsuarios=usuarios.data;
    },error=>{
      let message= error.error.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: message});
    });

  }
  btnAgregar(){
    this.ref=this.dialogService.open(CrearUsuarioComponent, {
      header: 'Agregar Usuario',
      width: '50%'
    });
  }
  btnEditarUsuario(usuario:UsuarioDTO){
    this.ref=this.dialogService.open(EditarUsuarioComponent, {
      header: 'Editar Usuario',
      width: '50%',
      data:usuario
    });
  }

  btnVerUsuario(usuario:UsuarioDTO){
    this.ref=this.dialogService.open(VerUsuarioComponent, {
      header: 'Datos del usuario',
      width: '50%',
      data:usuario
    });
  }

  
  btnEliminarUsuario(usuario:UsuarioDTO){
    
    Swal.fire({
      title: '¿ Esta seguro en eliminar ?',
      text: usuario.username,
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
            this.subEliminarUsuario=this.usuarioService.eliminarPorId(usuario.id).subscribe(response=>{
              console.log(response);
              this.Toast.fire({
                icon: 'success',
                title: 'Usuario Eliminado con éxito'
              })
            },error=>{
              Swal.close();
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar el Usuario'});
              console.log(error);
            })
          }
        });
      }
    })
  }
  cerrarModal(){
    this.ref.close();
  }
  ngOnDestroy(): void {
    if(this.subCargarUsuarios){
      this.subCargarUsuarios.unsubscribe();
    }
    if(this.subRefresh){
      this.subRefresh.unsubscribe();
    }
    if(this.subEliminarUsuario){
      this.subEliminarUsuario.unsubscribe();
    }
    if (this.ref) {
      this.ref.close();
    }
  }
}
