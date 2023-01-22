import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../servicios/usuario.service';
import { obtenerUsuarioDTO } from '../usuario.model';

@Component({
  providers: [MessageService],
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.scss']
})
export class VerUsuarioComponent implements OnInit {

        //input
        @Input() modeloUsuario!:obtenerUsuarioDTO;

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

  constructor(private cantonService:UsuarioService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    console.log("modelo desde Ver canton");

    this.obtenerUsuarioPorId();
  }

  obtenerUsuarioPorId(){
    
    this.cantonService.obtenerUsuarioPorId(this.config.data.id).subscribe(response=>{
      console.log('response.data');
      console.log(response.data);
      this.modeloUsuario=response.data;
    },error=>{
      console.log(error);
    });
  }

}
