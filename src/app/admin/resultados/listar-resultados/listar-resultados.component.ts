import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { LitarResultadosDTO, ResultadoDTO } from '../resultados.model';
import { ResultadosService } from '../../servicios/resultados.service';
import { CrearResultadosComponent } from '../crear-resultados/crear-resultados.component';
import { EditarResultadosComponent } from '../editar-resultados/editar-resultados.component';
import { VerResultadosComponent } from '../ver-resultados/ver-resultados.component';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-listar-resultados',
  templateUrl: './listar-resultados.component.html',
  styleUrls: ['./listar-resultados.component.scss']
})
export class ListarResultadosComponent implements OnInit {

  //instancias
  selectedCustomer!: ResultadoDTO;
  listarResultado:LitarResultadosDTO[] = [];
  //variables globales
  loading:boolean=false;

  //suscription
  ref!: DynamicDialogRef;
  subCargarResultado!:Subscription;
  subEliminarResultado!:Subscription;
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

  constructor(private resultadoService:ResultadosService,
              public dialogService: DialogService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarResultados();
    this.subRefresh = this.resultadoService.refresh$.subscribe(()=>{  
      this.cargarResultados();
    });
  }

  cargarResultados():void{
    this.subCargarResultado=this.resultadoService.obtenerTodos().subscribe(cantones=>{
      this.loading=false;
      this.listarResultado=cantones.data;
    },error=>{
      let message= error.error.message;
      this.messageService.add({severity:'error', summary: 'Error', detail: message});
    });

  }
  btnAgregar(){
    this.ref=this.dialogService.open(CrearResultadosComponent, {
      header: 'Agregar Resultado',
      width: '50%'
    });
  }
  btnEditarResultado(resultado:ResultadoDTO){
    this.ref=this.dialogService.open(EditarResultadosComponent, {
      header: 'Editar Resultado',
      width: '50%',
      data:resultado
    });
  }

  btnVerResultado(resultado:ResultadoDTO){
    this.ref=this.dialogService.open(VerResultadosComponent, {
      header: 'Datos del Resultado',
      width: '50%',
      data:resultado
    });
  }

  btnEliminarResultado(canton:ResultadoDTO){
    
    Swal.fire({
      title: '¿ Esta seguro en eliminar ?',
      text: canton.year.toString(),
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
            
            this.subEliminarResultado=this.resultadoService.eliminarPorId(canton.id).subscribe((response)=>{
              console.log('response');
              console.log(response);
              this.Toast.fire({
                icon: 'success',
                title: 'Resultado Eliminado con éxito'
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
    if(this.subCargarResultado){
      this.subCargarResultado.unsubscribe();
    }
    if(this.subRefresh){
      this.subRefresh.unsubscribe();
    }
    if(this.subEliminarResultado){
      this.subEliminarResultado.unsubscribe();
    }
    if (this.ref) {
      this.ref.close();
    }
  }

}
