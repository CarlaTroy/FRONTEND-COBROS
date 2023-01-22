import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearResultadoDTO, ResultadoDTO } from '../resultados.model';
import { ResultadosService } from '../../servicios/resultados.service';

@Component({
  providers: [MessageService],
  selector: 'app-editar-resultados',
  templateUrl: './editar-resultados.component.html',
  styleUrls: ['./editar-resultados.component.scss']
})
export class EditarResultadosComponent implements OnInit {

  //input
  @Input() modeloResultado!:ResultadoDTO;
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

  constructor(private resultadoService:ResultadosService,
    //public dialogService: FormularioRolComponent,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    console.log("modelo desde editar canton");
    console.log(this.config.data);
    console.log(this.ref);
    this.obtenerResultadoPorId();
  }

  editarResultado(instanciaResultadoEditar:CrearResultadoDTO){
    console.log(instanciaResultadoEditar);
    this.subs = this.resultadoService.editar(this.config.data.id,instanciaResultadoEditar).subscribe( 
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
  obtenerResultadoPorId(){
    this.resultadoService.obtenerResultadoPorId(this.config.data.id).subscribe(response=>{
      this.modeloResultado=response.data;
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
