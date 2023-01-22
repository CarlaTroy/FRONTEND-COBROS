import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { combiarCantonParroquiaProductorDTO, LitarProductoresDTO, ProductorDTO } from '../productor.model';
import { ProductorService } from '../../servicios/productor.service';
import { CrearProductorComponent } from '../crear-productor/crear-productor.component';
import { EditarProductorComponent } from '../editar-productor/editar-productor.component';
import { CantonService } from '../../servicios/canton.service';
import { LitarCantonesDTO } from '../../canton/canton.model';
import { LitarParroquiasDTO } from '../../parroquia/parroquia.model';
import { ParroquiaService } from '../../servicios/parroquia.service';
import { VerProductorComponent } from '../ver-productor/ver-productor.component';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-listar-productor',
  templateUrl: './listar-productor.component.html',
  styleUrls: ['./listar-productor.component.scss']
})
export class ListarProductorComponent implements OnInit, OnDestroy {

  //listaPresentarDatosProductor: combiarCantonParroquiaProductorDTO[] = [];
  objCombinacion!: combiarCantonParroquiaProductorDTO;
  selectedCustomer!: ProductorDTO;
  listarProductores:LitarProductoresDTO[] = [];
  listarCantones:LitarCantonesDTO[] = [];
  listarParroquias:LitarParroquiasDTO[] = [];
  //variables globales
  loading:boolean=false;

  //suscription
  ref!: DynamicDialogRef;
  subCargarProductores!:Subscription;
  subCargarCantones!:Subscription;
  subCargarParroquias!:Subscription;
  subEliminarProductores!:Subscription;
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

  constructor(private parroquiaService:ParroquiaService,
    private cantonService:CantonService, 
    private productorService:ProductorService,
    public dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarProductores();
    this.cargarCantones()
    this.cargarParroquias()
  
    this.subRefresh = this.productorService.refresh$.subscribe(()=>{  
      this.cargarProductores();
    });
    /*setTimeout(() => {
      this.listaPresentarDatosProductor = []
      this.combinarCantonProductores()
    }, 1000);*/

  }


  /*combinarCantonProductores(){
    this.listaPresentarDatosProductor = []
    for (let i = 0; i < this.listarProductores.length; i++) {
      
      for (let j = 0; j < this.listarParroquias.length; j++) {

      for (let k = 0; k < this.listarCantones.length; k++) {

        if(this.listarProductores[i].fk_canton.id === this.listarCantones[k].id && this.listarProductores[i].fk_parroquia.id === this.listarParroquias[j].id){

          this.objCombinacion = {
            id: this.listarProductores[i].id,
            nombre : this.listarProductores[i].nombre,
            apellido : this.listarProductores[i].apellido,
            cedula : this.listarProductores[i].cedula,
            celular : this.listarProductores[i].celular,
            activo : this.listarProductores[i].activo,
            canton : this.listarCantones[k].nombre,
            parroquia : this.listarParroquias[j].nombre,

          }

          //console.log(this.listarProductores[i].nombre)
          //console.log(this.listarProductores[i].apellido)
          //console.log(this.listarProductores[i].cedula)
          //console.log(this.listarProductores[i].celular)
          //console.log(this.listarCantones[i].nombre)
          
          this.listaPresentarDatosProductor = [this.objCombinacion, ...this.listaPresentarDatosProductor]
        }
        
        }
      }
    }  
    console.log(this.listaPresentarDatosProductor)
  }*/

  cargarProductores():void{
    //this.listaPresentarDatosProductor = []
    this.subCargarProductores=this.productorService.obtenerTodos().subscribe(productores=>{
      //console.log(productores.data);
      this.loading=false;
      this.listarProductores=productores.data;
      //this.combinarCantonProductores()
      

    },error=>{
      let message= error.error.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: message});
    });

  }
  btnAgregar(){
    this.ref=this.dialogService.open(CrearProductorComponent, {
      header: 'Agregar productor',
      width: '50%'
    });
  }
  btnEditarProductor(productor:ProductorDTO){
    this.ref=this.dialogService.open(EditarProductorComponent, {
      header: 'Editar productor',
      width: '50%',
      data:productor
    });
  }

  btnVerProductor(productor:ProductorDTO){
    this.ref=this.dialogService.open(VerProductorComponent, {
      header: 'Datos del productor',
      width: '35%',
      data:productor
    });
  }


  btnEliminarProductor(productor:ProductorDTO){
    
    Swal.fire({
      title: '¿ Esta seguro en eliminar ?',
      text: productor.nombre,
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
            this.subEliminarProductores=this.productorService.eliminarPorId(productor.id).subscribe(response=>{
              console.log(response);
              this.Toast.fire({
                icon: 'success',
                title: 'productor Eliminado con éxito'
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

  cargarParroquias():void{
    this.subCargarParroquias=this.parroquiaService.obtenerTodos().subscribe(parroquias=>{
      this.loading=false;
      this.listarParroquias=parroquias;
    },error=>{
      let message= error.error.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: message});
    });
  }

  cargarCantones():void{
    this.subCargarCantones=this.cantonService.obtenerTodos().subscribe(cantones=>{
      //console.log(cantones);
      this.loading=false;
      this.listarCantones=cantones;
      
    },error=>{
      let message= error.error.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: message});
    });

  }

  cerrarModal(){
    this.ref.close();
  }
  ngOnDestroy(): void {
    if(this.subCargarCantones){
      this.subCargarCantones.unsubscribe();
    }
    if(this.subCargarParroquias){
      this.subCargarParroquias.unsubscribe();
    }
    if(this.subCargarProductores){
      this.subCargarProductores.unsubscribe();
    }
    if(this.subRefresh){
      this.subRefresh.unsubscribe();
    }
    if(this.subEliminarProductores){
      this.subEliminarProductores.unsubscribe();
    }
    if (this.ref) {
      this.ref.close();
    }
  }
}
