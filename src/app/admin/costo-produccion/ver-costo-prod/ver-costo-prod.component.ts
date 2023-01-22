import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { CostoProduccionDTO } from '../costo.produccion.model';
import { CostoProduccionService } from '../../servicios/costo-produccion.service';

@Component({
  providers: [MessageService],
  selector: 'app-ver-costo-prod',
  templateUrl: './ver-costo-prod.component.html',
  styleUrls: ['./ver-costo-prod.component.scss']
})
export class VerCostoProdComponent implements OnInit {

  
      //input
      @Input() modeloCanton!:CostoProduccionDTO;

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

  constructor(private cantonService:CostoProduccionService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {

    this.obtenerCantonPorId();
  }


  obtenerCantonPorId(){
    
    this.cantonService.obtenerCostoProduccionPorId(this.config.data.id).subscribe(response=>{
      //console.log(response);
      this.modeloCanton=response.data;
    },error=>{
      console.log(error);
    });
  }


}
