import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { LitarIntermediariosDTO, IntermediarioDTO } from '../intermediario.model';
import { IntermediarioService } from '../../servicios/intermediario.service';
import { CrearIntermediarioComponent } from '../crear-intermediario/crear-intermediario.component';
import { EditarIntermediarioComponent } from '../editar-intermediario/editar-intermediario.component';
import { VerIntermediarioComponent } from '../ver-intermediario/ver-intermediario.component';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-listar-intermediario',
  templateUrl: './listar-intermediario.component.html',
  styleUrls: ['./listar-intermediario.component.scss']
})
export class ListarIntermediarioComponent implements OnInit, OnDestroy {

    //instancias
    selectedCustomer!: IntermediarioDTO;
    listarIntermediarios:LitarIntermediariosDTO[] = [];
    //variables globales
    loading:boolean=false;
  
    //suscription
    ref!: DynamicDialogRef;
    subCargarIntermediarios!:Subscription;
    subEliminarIntermediarios!:Subscription;
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
  
    constructor(private intermediarioService:IntermediarioService,
                public dialogService: DialogService,
                private messageService: MessageService) { }
  
    ngOnInit(): void {
      this.cargarIntermediarios();
      this.subRefresh = this.intermediarioService.refresh$.subscribe(()=>{  
        this.cargarIntermediarios();
      });
    }
  
    cargarIntermediarios():void{
      this.subCargarIntermediarios=this.intermediarioService.obtenerTodos().subscribe(intermediarios=>{
        console.log(intermediarios);
        this.loading=false;
        this.listarIntermediarios=intermediarios.data;
      },error=>{
        let message= error.error.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: message});
      });
  
    }
    btnAgregar(){
      this.ref=this.dialogService.open(CrearIntermediarioComponent, {
        header: 'Agregar Intermediario',
        width: '30%'
      });
    }
    btnEditarIntermediario(intermediario:IntermediarioDTO){
      this.ref=this.dialogService.open(EditarIntermediarioComponent, {
        header: 'Editar Intermediario',
        width: '30%',
        data:intermediario
      });
    }
  
    btnVerIntermediario(productor:IntermediarioDTO){
      this.ref=this.dialogService.open(VerIntermediarioComponent, {
        header: 'Datos del Intermediario',
        width: '30%',
        data:productor
      });
    }
  
    btnEliminarIntermediario(intermediario:IntermediarioDTO){
      
      Swal.fire({
        title: '¿ Esta seguro en eliminar ?',
        text: intermediario.lugar,
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
              this.subEliminarIntermediarios=this.intermediarioService.eliminarPorId(intermediario.id).subscribe(response=>{
                console.log(response);
                this.Toast.fire({
                  icon: 'success',
                  title: 'Cantón Eliminado con éxito'
                })
              },error=>{
                Swal.close();
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
      if(this.subCargarIntermediarios){
        this.subCargarIntermediarios.unsubscribe();
      }
      if(this.subRefresh){
        this.subRefresh.unsubscribe();
      }
      if(this.subEliminarIntermediarios){
        this.subEliminarIntermediarios.unsubscribe();
      }
      if (this.ref) {
        this.ref.close();
      }
    }

}
