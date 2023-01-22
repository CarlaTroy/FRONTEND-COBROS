import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ProduccionDTO } from '../produccion.model';
import { ProduccionService } from '../../servicios/produccion.service';

@Component({
  providers: [MessageService],
  selector: 'app-ver-produccion',
  templateUrl: './ver-produccion.component.html',
  styleUrls: ['./ver-produccion.component.scss']
})
export class VerProduccionComponent implements OnInit {
//input
@Input() modeloProduccion!:ProduccionDTO;

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

constructor(private cantonService:ProduccionService,
public ref: DynamicDialogRef, 
public config: DynamicDialogConfig) { }

ngOnInit(): void {

this.obtenerProduccionPorId();
}


obtenerProduccionPorId(){

this.cantonService.obtenerProduccionPorId(this.config.data.id).subscribe(response=>{
//console.log(response);
this.modeloProduccion=response.data;
},error=>{
console.log(error);
});
}

}
