import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearParroquiaDTO, EditParroquiaDTO, ObtenerUnaParroquiaDTO, ParroquiaDTO } from '../parroquia.model';
import { ParroquiaService } from '../../servicios/parroquia.service';

@Component({
  providers: [MessageService],
  selector: 'app-editar-parroquia',
  templateUrl: './editar-parroquia.component.html',
  styleUrls: ['./editar-parroquia.component.scss']
})
export class EditarParroquiaComponent implements OnInit {
  
  //input
  @Input() modeloParroquia!:ObtenerUnaParroquiaDTO;
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

  constructor(private parroquiaService:ParroquiaService,
    //public dialogService: FormularioRolComponent,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private messageService: MessageService) { }

  ngOnInit(): void {
    console.log("modelo desde editar parroquia");
    //console.log(this.config.data);
    //console.log(this.ref);
    this.obtenerParroquiaPorId();
  }

  editarParroquia(instanciaParroquiaEditar:CrearParroquiaDTO){

    console.log('editParroq');
    console.log(this.config.data.id);
    console.log(instanciaParroquiaEditar);
    this.subs = this.parroquiaService.editar(this.config.data.id,instanciaParroquiaEditar).subscribe( 
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

  obtenerParroquiaPorId(){
    this.parroquiaService.obtenerParroquiaPorId(this.config.data.id).subscribe(response=>{
      
      console.log('obtener parroquia por ID');
      console.log(response);
      this.modeloParroquia=response.data;
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
