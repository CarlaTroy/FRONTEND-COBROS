import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CostoProduccionDTO, CrearCostoProduccionDTO } from '../costo.produccion.model';
import { CostoProduccionService } from '../../servicios/costo-produccion.service';


@Component({
  providers: [MessageService],
  selector: 'app-editar-costo-prod',
  templateUrl: './editar-costo-prod.component.html',
  styleUrls: ['./editar-costo-prod.component.scss']
})
export class EditarCostoProdComponent implements OnInit {

   //input
   @Input() modeloCanton!:CostoProduccionDTO;
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
 
   constructor(private cantonService:CostoProduccionService,
     //public dialogService: FormularioRolComponent,
     public ref: DynamicDialogRef, 
     public config: DynamicDialogConfig,
     private messageService: MessageService,) { }
 
   ngOnInit(): void {
     
     this.obtenerCostoProduccionPorId();
   }
 
   editarCostoProduccion(instanciaCantonEditar:CrearCostoProduccionDTO){
     console.log(instanciaCantonEditar);
     this.subs = this.cantonService.editar(this.config.data.id,instanciaCantonEditar).subscribe( 
     (response: any) => {
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
   obtenerCostoProduccionPorId(){
     this.cantonService.obtenerCostoProduccionPorId(this.config.data.id).subscribe(response=>{
       this.modeloCanton=response.data;
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
