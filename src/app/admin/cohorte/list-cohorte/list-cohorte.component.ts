import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CohorteService } from '../../servicios/cohorte.service';
import { CohorteFullDTO } from '../cohorte';

@Component({
  selector: 'app-list-cohorte',
  templateUrl: './list-cohorte.component.html',
  styleUrls: ['./list-cohorte.component.scss']
})
export class ListCohorteComponent implements OnInit {
    //DTO
    selectedCohorte!: CohorteFullDTO;
    listCohorte:CohorteFullDTO[] = [];
     //variables globales
   loading:boolean=false;
    //subcription
    subCohorte!:Subscription;
    subDelete!:Subscription;
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
  constructor(private cohorteService:CohorteService) { }

  ngOnInit(): void {
    this.loadDataCourses();
    //refresh table and delete registro
    this.subDelete = this.cohorteService.refreshTable$.subscribe(()=>{
        this.loadDataCourses();
    });
  }
  loadDataCourses(){
    this.loading=true;
    this.subCohorte=this.cohorteService.getAll().subscribe(response=>{
        this.loading=false;
        this.listCohorte=response.data;
      },error=>{
        let message= error.error.message;
        Swal.close();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error',
            footer:message
          })
      });
  }
  btnDeleteCohorte(cohorte:CohorteFullDTO){
    Swal.fire({
        title: '¿ Esta seguro en eliminar ?',
        text: cohorte.name,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        //Swal.showLoading();
        if(result.isConfirmed){
          Swal.fire({
            title: 'Eliminando...',
            html: 'Espere porfavor...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading(undefined)
              this.subDelete=this.cohorteService.deleteCohorteId(cohorte.id).subscribe((response)=>{
                if(response.success){
                    this.Toast.fire({
                      icon: 'success',
                      title: response.message
                    })
                    return;
                }
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Información',
                    footer: response.message
                })
              },error=>{
                Swal.close();
                let message= error.error.message;
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error',
                    footer:message
                  })
              })
            }
          });
        }
      })
  }
}
