import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { LitarProduccionesDTO, ProduccionDTO } from '../produccion.model';
import { ProduccionService } from '../../servicios/produccion.service';
import { CrearProduccionComponent } from '../crear-produccion/crear-produccion.component';
import { EditarProduccionComponent } from '../editar-produccion/editar-produccion.component';
import { VerProduccionComponent } from '../ver-produccion/ver-produccion.component';

@Component({
    providers: [MessageService,DialogService],
  selector: 'app-listar-produccion',
  templateUrl: './listar-produccion.component.html',
  styleUrls: ['./listar-produccion.component.scss']
})
export class ListarProduccionComponent implements OnInit, OnDestroy {


  
    //instancias
  selectedCustomer!: ProduccionDTO;
  listarProducciones:LitarProduccionesDTO[] = [];
  //variables globales
  loading:boolean=false;

  //suscription
  ref!: DynamicDialogRef;
  subCargarProducciones!:Subscription;
  subEliminarProducciones!:Subscription;
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

  constructor(private produccionService:ProduccionService,
              public dialogService: DialogService,
              private messageService: MessageService) { }

  ngOnInit(): void {

    this.cargarProducciones();
    this.subRefresh = this.produccionService.refresh$.subscribe(()=>{  
      this.cargarProducciones();
    });

  }

  cargarProducciones():void{
    this.subCargarProducciones=this.produccionService.obtenerTodos().subscribe(producciones=>{
      console.log(producciones.data);
      this.loading=false;
      this.listarProducciones=producciones.data;
    },error=>{
      let message= error.error.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: message});
    });

  }
  btnAgregar(){
    this.ref=this.dialogService.open(CrearProduccionComponent, {
      header: 'Agregar Producción',
      width: '50%'
    });
  }
  btnEditarProducciones(produccion:ProduccionDTO){
    this.ref=this.dialogService.open(EditarProduccionComponent, {
      header: 'Editar Producción',
      width: '50%',
      data:produccion
    });
  }

  btnVerProduccion(productor:ProduccionDTO){
    this.ref=this.dialogService.open(VerProduccionComponent, {
      header: 'Datos de Producción',
      width: '50%',
      data:productor
    });
  }

  btnEliminarProduccion(produccion:ProduccionDTO){
    
    Swal.fire({
      title: '¿ Esta seguro en eliminar esta producción?',
      text: 'Anio',
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
            this.subEliminarProducciones=this.produccionService.eliminarPorId(produccion.id).subscribe(response=>{
              console.log(response);
              this.Toast.fire({
                icon: 'success',
                title: 'Producción Eliminado con éxito'
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
    if(this.subCargarProducciones){
      this.subCargarProducciones.unsubscribe();
    }
    if(this.subRefresh){
      this.subRefresh.unsubscribe();
    }
    if(this.subEliminarProducciones){
      this.subEliminarProducciones.unsubscribe();
    }
    if (this.ref) {
      this.ref.close();
    }
  }

}
