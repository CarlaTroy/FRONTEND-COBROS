import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ResultadosService } from '../../servicios/resultados.service';
import { CrearResultadoDTO } from '../resultados.model';

@Component({
  providers: [MessageService],
  selector: 'app-crear-resultados',
  templateUrl: './crear-resultados.component.html',
  styleUrls: ['./crear-resultados.component.scss']
})
export class CrearResultadosComponent implements OnInit {

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
    private resultadoService:ResultadosService) { }

  ngOnInit(): void {
  }

  crearResultado(instanciaResultadoCrear:CrearResultadoDTO){
    console.log(instanciaResultadoCrear);
    this.subs = this.resultadoService.crear(instanciaResultadoCrear).subscribe( 
    (response: any) => {
      console.log(response);
      this.Toast.fire({
        icon: 'success',
        title: response.message
      })
      //this.ref.cerrarModal();
      this.ref.close();
      },
      (error: any) => {
        console.log('error')
        console.log(error.error.message)
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
