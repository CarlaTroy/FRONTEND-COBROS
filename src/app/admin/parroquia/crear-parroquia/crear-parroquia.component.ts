import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ParroquiaService } from '../../servicios/parroquia.service';
import { CrearParroquiaDTO } from '../parroquia.model';

@Component({
  providers: [MessageService],
  selector: 'app-crear-parroquia',
  templateUrl: './crear-parroquia.component.html',
  styleUrls: ['./crear-parroquia.component.scss']
})
export class CrearParroquiaComponent implements OnInit, OnDestroy {

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
    private parroquiaService:ParroquiaService) { }

  ngOnInit(): void {
  }

  crearParroquia(instanciaParroquiaCrear:CrearParroquiaDTO){
    //console.log(instanciaParroquiaCrear);
    this.subs = this.parroquiaService.crear(instanciaParroquiaCrear).subscribe( 
    (response: any) => {
      this.Toast.fire({
        icon: 'success',
        title: response.message
      })
      //this.ref.cerrarModal();
      this.ref.close();
      },
      (error) => {
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
