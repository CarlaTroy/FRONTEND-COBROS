import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearIntermediarioDTO, IntermediarioDTO } from '../intermediario.model';
import { IntermediarioService } from '../../servicios/intermediario.service';

@Component({
  providers: [MessageService],
  selector: 'app-editar-intermediario',
  templateUrl: './editar-intermediario.component.html',
  styleUrls: ['./editar-intermediario.component.scss']
})
export class EditarIntermediarioComponent implements OnInit {
//input
@Input() modeloIntermediario!:IntermediarioDTO;
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

constructor(private intermediarioService:IntermediarioService,
  //public dialogService: FormularioRolComponent,
  public ref: DynamicDialogRef, 
  public config: DynamicDialogConfig,
  private messageService: MessageService,) { }

ngOnInit(): void {
  this.obtenerIntermediarioPorId();
}

editarIntermediario(instanciaIntermediarioEditar:CrearIntermediarioDTO){
  console.log(instanciaIntermediarioEditar);
  this.subs = this.intermediarioService.editar(this.config.data.id,instanciaIntermediarioEditar).subscribe( 
  (response: any) => {
    console.log(response);
    this.Toast.fire({
      icon: 'success',
      title: response.message
    })
    this.ref.close();
    },
    (error) => {
      let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
      }
  );
}
obtenerIntermediarioPorId(){
  this.intermediarioService.obtenerIntermediarioPorId(this.config.data.id).subscribe(response=>{
    this.modeloIntermediario=response.data;
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
