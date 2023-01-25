import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-cohorte',
  templateUrl: './edit-cohorte.component.html',
  styleUrls: ['./edit-cohorte.component.scss']
})
export class EditCohorteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadDataCourses();
    this.getCohorteId();
  }
  loadDataCourses(){
    this.subCourse=this.courseService.getAll().subscribe(response=>{
        this.listCourse=response.data;
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
  getCohorteId(){
    this.activatedRoute.params.subscribe((response:any)=>{
        this.sub = this.cohorteService.getCohorte(Number(response.id)).subscribe(response=>{
            if(response.success){
                this.modelCohorteFull=response.data;
                return;
            }
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Información',
                footer: response.message
            })
        },error=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error',
                footer: error.message
            })
        });
    });
  }
  editCohorte(courseCreate:any){
    Swal.fire({
        allowOutsideClick: false,
        text: 'Espere por favor...',
        timerProgressBar: false,
    });
    Swal.showLoading()
    this.cohorteService.edit(courseCreate,this.modelCohorteFull.id).subscribe(response=>{
        Swal.close();
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
        console.log(error);
        Swal.close();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error',
            footer: error.message
          })
    });
  }
}
