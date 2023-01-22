import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CantonService } from '../../servicios/canton.service';
import { CrearCantonDTO } from '../canton.model';

@Component({
  providers: [MessageService],
  selector: 'app-crear-canton',
  templateUrl: './crear-canton.component.html',
  styleUrls: ['./crear-canton.component.scss']
})
export class CrearCantonComponent implements OnInit, OnDestroy {

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
    private cantonService:CantonService) { }

  ngOnInit(): void {
  }

  crearCanton(instanciaCantonCrear:CrearCantonDTO){
    console.log(instanciaCantonCrear);
    this.subs = this.cantonService.crear(instanciaCantonCrear).subscribe( 
    (response: any) => {
      console.log(response);
      this.Toast.fire({
        icon: 'success',
        title: response.message
      })
      //this.ref.cerrarModal();
      this.ref.close();
      },
      (error: any) => {
        console.log('error')
        console.log(error.error.message)
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
