import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CrearIntermediarioDTO } from '../intermediario.model';
import { IntermediarioService } from '../../servicios/intermediario.service';

@Component({
  providers: [MessageService],
  selector: 'app-crear-intermediario',
  templateUrl: './crear-intermediario.component.html',
  styleUrls: ['./crear-intermediario.component.scss']
})
export class CrearIntermediarioComponent implements OnInit {


  subs!:Subscription;
  //toas
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

  constructor(private messageService: MessageService,
    //public dialogService: FormularioRolComponent,
    public ref: DynamicDialogRef, 
    private intermediarioService:IntermediarioService) { }

  ngOnInit(): void {
  }


  crearIntermediario(instanciaIntermediarioCrear:CrearIntermediarioDTO){
    console.log(instanciaIntermediarioCrear);
    this.subs = this.intermediarioService.crear(instanciaIntermediarioCrear).subscribe( 
    (response: any) => {
      console.log(response);
      this.Toast.fire({
        icon: 'success',
        title: response.message
      })
      //this.ref.cerrarModal();
      this.ref.close();
      },
      (error) => {
        let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
      }
    );
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }
}
