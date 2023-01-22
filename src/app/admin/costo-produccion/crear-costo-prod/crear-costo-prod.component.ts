import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CostoProduccionService } from '../../servicios/costo-produccion.service';
import { CostoProduccionDTO, CrearCostoProduccionDTO } from '../costo.produccion.model';

@Component({
  providers: [MessageService],
  selector: 'app-crear-costo-prod',
  templateUrl: './crear-costo-prod.component.html',
  styleUrls: ['./crear-costo-prod.component.scss']
})
export class CrearCostoProdComponent implements OnInit {

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
    private costoProduccionService:CostoProduccionService) { }

  ngOnInit(): void {
  }

  crearCostoProduccion(instanciaCostoProduccionCrear:CrearCostoProduccionDTO){
    console.log(instanciaCostoProduccionCrear);
    this.subs = this.costoProduccionService.crear(instanciaCostoProduccionCrear).subscribe( 
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
