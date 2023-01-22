import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { IntermediarioProduccionDTO } from '../intermediario-produccion.model';
import { IntermediarioProduccionService } from '../../servicios/intermediario-produccion.service';

@Component({
  providers: [MessageService],
  selector: 'app-ver-intermediario-produccion',
  templateUrl: './ver-intermediario-produccion.component.html',
  styleUrls: ['./ver-intermediario-produccion.component.scss']
})
export class VerIntermediarioProduccionComponent implements OnInit {

 //input
 @Input() modeloIntermediario!:IntermediarioProduccionDTO;

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

constructor(private cantonService:IntermediarioProduccionService,
public ref: DynamicDialogRef, 
public config: DynamicDialogConfig) { }

ngOnInit(): void {

this.obtenerCantonPorId();
}


obtenerCantonPorId(){

this.cantonService.obtenerIntermediarioProduccionPorId(this.config.data.id).subscribe(response=>{
 //console.log(response);
 this.modeloIntermediario=response.data;
},error=>{
 console.log(error);
});
}

}
