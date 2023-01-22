import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearProductorDTO, EditProductorDTO, ObtenerUnProductorDTO, ProductorDTO } from '../productor.model';
import { ProductorService } from '../../servicios/productor.service';

@Component({
  providers: [MessageService],
  selector: 'app-editar-productor',
  templateUrl: './editar-productor.component.html',
  styleUrls: ['./editar-productor.component.scss']
})
export class EditarProductorComponent implements OnInit {

  
  //input
  @Input() modeloProductor!:ObtenerUnProductorDTO;
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

  constructor(private productorService:ProductorService,
    //public dialogService: FormularioRolComponent,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.obtenerProductorPorId();
  }
  editarProductor(instanciaPproductorEditar:CrearProductorDTO){
    console.log('instanciaPproductorEditar');
    console.log(instanciaPproductorEditar);
    this.subs = this.productorService.editar(this.config.data.id,instanciaPproductorEditar).subscribe( 
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

  obtenerProductorPorId(){
    this.productorService.obtenerProductorPorId(this.config.data.id).subscribe(response=>{
      //console.log(response.data)
      this.modeloProductor=response.data;
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
