import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ResultadoDTO } from '../resultados.model';
import { ResultadosService } from '../../servicios/resultados.service';

@Component({
  providers: [MessageService],
  selector: 'app-ver-resultados',
  templateUrl: './ver-resultados.component.html',
  styleUrls: ['./ver-resultados.component.scss']
})
export class VerResultadosComponent implements OnInit {

   //input
   @Input() modeloResultado!:ResultadoDTO;

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
 public ref: DynamicDialogRef, 
 public config: DynamicDialogConfig) { }

ngOnInit(): void {

 this.obtenerResultadoPorId();
}


obtenerResultadoPorId(){
 
 this.resultadoService.obtenerResultadoPorId(this.config.data.id).subscribe(response=>{
   console.log(response);
   this.modeloResultado=response.data;
 },error=>{
   console.log(error);
 });
}

}
