import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { CostoProduccionDTO, LitarCostoProduccionesDTO } from '../costo.produccion.model';
import { CostoProduccionService } from '../../servicios/costo-produccion.service';
import { CrearCostoProdComponent } from '../crear-costo-prod/crear-costo-prod.component';
import { EditarCostoProdComponent } from '../editar-costo-prod/editar-costo-prod.component';
import { VerCostoProdComponent } from '../ver-costo-prod/ver-costo-prod.component';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-listar-costo-prod',
  templateUrl: './listar-costo-prod.component.html',
  styleUrls: ['./listar-costo-prod.component.scss']
})
export class ListarCostoProdComponent implements OnInit {

    //instancias
    selectedCustomer!: CostoProduccionDTO;
    listarCostoProduccion:LitarCostoProduccionesDTO[] = [];
    //variables globales
    loading:boolean=false;
  
    //suscription
    ref!: DynamicDialogRef;
    subCargarCostoProduccion!:Subscription;
    subEliminarCostoProduccion!:Subscription;
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
  
    constructor(private costoProduccionService:CostoProduccionService,
                public dialogService: DialogService,
                private messageService: MessageService) { }
  
    ngOnInit(): void {
      this.cargarCostoProduccion();
      this.subRefresh = this.costoProduccionService.refresh$.subscribe(()=>{  
        this.cargarCostoProduccion();
      });
    }
  
    cargarCostoProduccion():void{
      this.subCargarCostoProduccion=this.costoProduccionService.obtenerTodos().subscribe(cantones=>{
        this.loading=false;
        this.listarCostoProduccion=cantones.data;
      },error=>{
        let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
      });
  
    }
    btnAgregar(){
      this.ref=this.dialogService.open(CrearCostoProdComponent, {
        header: 'Agregar Costo de Producción',
        width: '90%'
      });
    }
    btnEditarCostoProduccion(costoProduccion:CostoProduccionDTO){
      this.ref=this.dialogService.open(EditarCostoProdComponent, {
        header: 'Editar Costo de Producción',
        width: '90%',
        data:costoProduccion
      });
    }
  
    btnVerCostoProduccion(productor:CostoProduccionDTO){
      this.ref=this.dialogService.open(VerCostoProdComponent, {
        header: 'Datos del Costo de Producción',
        width: '90%',
        data:productor
      });
    }
  
    btnEliminarCostoProduccion(costoProduccion:CostoProduccionDTO){
      debugger
      Swal.fire({
        title: '¿ Esta seguro en eliminar el costo de producción?',
        text: costoProduccion.year.toString(),
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
              
              this.subEliminarCostoProduccion=this.costoProduccionService.eliminarPorId(costoProduccion.id).subscribe((response: any)=>{
                console.log('response eliminando costo de prod');
                console.log(response);
                this.Toast.fire({
                  icon: 'success',
                  title: ' costo de producción Eliminado con éxito'
                })
              },error=>{
                Swal.close();
                console.log(error)
                let message= error.error.message;
                this.messageService.add({severity:'error', summary: 'Error', detail: message});
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
      if(this.subCargarCostoProduccion){
        this.subCargarCostoProduccion.unsubscribe();
      }
      if(this.subRefresh){
        this.subRefresh.unsubscribe();
      }
      if(this.subEliminarCostoProduccion){
        this.subEliminarCostoProduccion.unsubscribe();
      }
      if (this.ref) {
        this.ref.close();
      }
    }

}
