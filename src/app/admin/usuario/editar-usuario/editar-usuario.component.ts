import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsuarioService } from '../../servicios/usuario.service';
import { CrearUsuarioDTO, UsuarioDTO, obtenerUsuarioDTO } from '../usuario.model';

@Component({
  providers: [MessageService],
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {


  
  //input
  @Input() modeloUsuario!:obtenerUsuarioDTO;
  //suscriptio
  subs!:Subscription;
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
    //public dialogService: FormularioRolComponent,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private messageService: MessageService,) { }

  ngOnInit(): void {
 
    this.obtenerUsuarioPorId();
  }
  editarUsuario(instanciaUsuarioEditar:CrearUsuarioDTO){
  
    this.subs = this.usuarioService.editar(this.config.data.id,instanciaUsuarioEditar).subscribe( 
    (response: any) => {
      
      this.Toast.fire({
        icon: 'success',
        title: response.message
      })
      this.ref.close();
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al actualizar el Usuario'});
        console.error(error)}
    );
  }
  obtenerUsuarioPorId(){
    this.usuarioService.obtenerUsuarioPorId(this.config.data.id).subscribe(response=>{
      this.modeloUsuario=response.data;
    },error=>{
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }

}
