import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { CantonDTO } from '../../canton/canton.model';
import { CantonService } from '../../servicios/canton.service';

@Component({
  providers: [MessageService],
  selector: 'app-ver-canton',
  templateUrl: './ver-canton.component.html',
  styleUrls: ['./ver-canton.component.scss']
})
export class VerCantonComponent implements OnInit {


      //input
      @Input() modeloCanton!:CantonDTO;

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

  constructor(private cantonService:CantonService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {

    this.obtenerCantonPorId();
  }


  obtenerCantonPorId(){
    
    this.cantonService.obtenerCantonPorId(this.config.data.id).subscribe(response=>{
      //console.log(response);
      this.modeloCanton=response.data;
    },error=>{
      console.log(error);
    });
  }

}
