import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CrearIntermediarioProduccionDTO } from '../intermediario-produccion.model';
import { IntermediarioProduccionService } from '../../servicios/intermediario-produccion.service';

@Component({
  providers: [MessageService],
  selector: 'app-crear-intermediario-produccion',
  templateUrl: './crear-intermediario-produccion.component.html',
  styleUrls: ['./crear-intermediario-produccion.component.scss']
})
export class CrearIntermediarioProduccionComponent implements OnInit, OnDestroy {

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
    public ref: DynamicDialogRef, private empresaService: IntermediarioProduccionService) { }

  ngOnInit(): void {
  }
  crearEmpresa(instanciaEmpresaCrear:CrearIntermediarioProduccionDTO){
    //console.log(instanciaEmpresaCrear);
    this.subs = this.empresaService.crear(instanciaEmpresaCrear).subscribe( 
    (response) => {
      console.log(response);
      this.Toast.fire({
        icon: 'success',
        title: 'Empresa registrado con éxito'
      })
      //this.ref.cerrarModal();
      this.ref.close();
      },
      (error) => {
        console.log(error.error)
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
