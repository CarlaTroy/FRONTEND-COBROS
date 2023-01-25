import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CourseFullDTO } from 'src/app/admin/course/course';
import Swal from 'sweetalert2';
import { StudentCreateDTO, StudentFullDTO } from '../../student';
import { StudentService } from 'src/app/admin/servicios/student.service';
import { UsuarioDTO } from 'src/app/admin/usuario/usuario.model';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss']
})
export class FormStudentComponent implements OnInit {

  @Input() modeForm!:string;
    @Input() modelCourseFull!:UsuarioDTO[];
    @Input() modelCohorteseFull!:StudentFullDTO;
    
    courseIdSelected!: number;
    courseNameSelected: string = '';

    //output
   @Output() onSubmitCohorte:EventEmitter<StudentCreateDTO>=new EventEmitter<StudentCreateDTO>();
    //form
    formCohorte!:FormGroup;
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
    //suscription
    sub!:Subscription;
    //global var
    intanceCourse!:CourseFullDTO;
    filterValue = '';
  constructor(private formBuilder: FormBuilder,
                private cohorteService:StudentService,) 
                {
                }

  ngOnInit(): void {
    this.initInputForm();
   //si existe data entonces en modo edicion
   if(this.modelCohorteseFull){
    this.loadDataForm();
    return;
  }
  //modo creacion
  if(!this.modelCohorteseFull){
    return;
  }
    //observable cuandos se crea un registro nuevo
    this.sub=this.cohorteService.refreshForm$.subscribe(()=>{
        this.formCohorte.reset();
    });
  }
  OnDestroy(): void {
    if(this.sub) {
        this.sub.unsubscribe();
    }
  }

  loadDataForm(){
  console.log('this.modelCohorteseFull')
  console.log(this.modelCohorteseFull)
        this.formCohorte.patchValue(this.modelCohorteseFull);
        this.courseNameSelected = this.modelCohorteseFull.user.username;
        this.courseIdSelected = this.modelCohorteseFull.user.id;
    
  }

  // function personality
  initInputForm(){
    this.formCohorte = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(100)]],
        last_name: ['', [Validators.required]],
        identification: ['', [Validators.required]],
        cell_phone: ['', [Validators.required,Validators.min(0)]],
        address: ['', [Validators.required,Validators.min(0)]],
        user_id: ['', [Validators.required]],
      });
  }


  
  onChange(event: any) {
    if(!event.value) return
    console.log(event.value.id)
    console.log(event.value.username)
    this.courseIdSelected = Number.parseInt(event.value.id)
    this.courseNameSelected = event.value.username
    
  }


  submitCohorte(){
    if(this.formCohorte.invalid){
        this.Toast.fire({
            icon: 'warning',
            title: 'Debe completar todos los campos'
        })
        return Object.values(this.formCohorte.controls).forEach(contol=>{
            contol.markAsTouched();
        });
    }

    /* this.formCohorte.value.course_id = this.courseIdSelected
    const createCourse:CohorteCreateDTO=this.formCohorte.value
    this.onSubmitCohorte.emit(createCourse);*/
    this.formCohorte.value.user_id= this.courseIdSelected
   
  const createCourse:StudentCreateDTO={
        name:this.formCohorte.value.name,
        last_name:this.formCohorte.value.last_name,
        identification:this.formCohorte.value.identification,
        cell_phone:this.formCohorte.value.cell_phone,
        address:this.formCohorte.value.address,
        user_id:this.courseIdSelected
      }
      console.log(this.formCohorte.value)
      
    this.onSubmitCohorte.emit(createCourse);
    return;
  }
    //validate input
    get nameNotValid(){
        return this.formCohorte.get('name')?.invalid && this.formCohorte.get('name')?.touched;
    }

    get lastNameNotValid(){
    return this.formCohorte.get('last_name')?.invalid && this.formCohorte.get('last_name')?.touched;
    }
    get identificationNotValid(){
        return this.formCohorte.get('identification')?.invalid && this.formCohorte.get('identification')?.touched;
    }
    get cellPhoneNotValid(){
        return this.formCohorte.get('cell_phone')?.invalid && this.formCohorte.get('cell_phone')?.touched;
    }
    get AddressNotValid(){
        return this.formCohorte.get('address')?.invalid && this.formCohorte.get('address')?.touched;
    }
    get userIdNotValid(){
        return this.formCohorte.get('user_id')?.invalid && this.formCohorte.get('user_id')?.touched;
    }

}
