import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CourseFullDTO } from 'src/app/admin/course/course';
import Swal from 'sweetalert2';
import { FormStudentDTO, StudentCreateDTO, StudentFullDTO, UserFullDTO } from '../../student';
import { StudentService } from 'src/app/admin/servicios/student.service';
import { soloLetras } from 'src/app/core/validations/validateText';
import { soloNumeros } from 'src/app/core/validations/validateNumero';
import {validarCedula } from 'src/app/core/validations/validateCedula';



@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss']
})
export class FormStudentComponent implements OnInit {
    @Input() modeForm!:string;
    @Input() modelStudentFull!:StudentFullDTO;
    identificationDisable!:boolean;
    cedulaValidadaConExito?: boolean;
    //output
   @Output() onSubmitStudent:EventEmitter<StudentCreateDTO>=new EventEmitter<StudentCreateDTO>();
    //form
    formStudent!:FormGroup;
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
                private studentService:StudentService,)
                {
                }

  ngOnInit(): void {
    this.initInputForm();
   //si existe data entonces en modo edicion
   this.loadDataForm();


  }
  OnDestroy(): void {
    if(this.sub) {
        this.sub.unsubscribe();
    }
  }
  validarLetras(event:any){
    return soloLetras(event);
  }
  validateNumeros(event:any){
    return soloNumeros(event);
  }

  loadDataForm(){
    if(this.modelStudentFull!=undefined || this.modelStudentFull!=null){
        let formStudent:FormStudentDTO={
            name:this.modelStudentFull.name,
            address:this.modelStudentFull.address,
            cell_phone:this.modelStudentFull.cell_phone,
            identification:this.modelStudentFull.identification,
            last_name:this.modelStudentFull.last_name,
            email:this.modelStudentFull.user.email,
            is_active:this.modelStudentFull.user.is_active
        }
        this.formStudent.patchValue(formStudent);
        this.identificationDisable=true;
        //this.formStudent.get('identification')?.disable();
        //this.courseNameSelected = this.modelStudentFull.user.username;
        //this.courseIdSelected = this.modelStudentFull.user.id;
    }

  }

  // function personality
  initInputForm(){
    this.formStudent = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(100)]],
        last_name: ['', [Validators.required]],
        identification: ['', [Validators.required,Validators.maxLength(10), validarCedula()]],
        cell_phone: ['', [Validators.required,Validators.maxLength(10)]],
        address: ['', [Validators.required,Validators.min(0)]],
        email: ['', [Validators.required]],
        is_active:[true,[Validators.required]]
      });
  }



  handleActivo(e: any) {
    let isChecked = e.checked;
    console.log(isChecked)
    this.formStudent.value.is_active = isChecked
  }


  submitStudent(){
    if(this.formStudent.invalid){
        this.Toast.fire({
            icon: 'warning',
            title: 'Debe completar todos los campos'
        })
        return Object.values(this.formStudent.controls).forEach(contol=>{
            contol.markAsTouched();
        });
    }

    /* this.formCohorte.value.course_id = this.courseIdSelected
    const createCourse:CohorteCreateDTO=this.formCohorte.value
    this.onSubmitCohorte.emit(createCourse);*/


  const createStudent:StudentCreateDTO={
        name:this.formStudent.value.name,
        last_name:this.formStudent.value.last_name,
        identification:this.formStudent.value.identification,
        cell_phone:this.formStudent.value.cell_phone,
        address:this.formStudent.value.address,
        email:this.formStudent.value.email,
        is_active:this.formStudent.value.is_active
      }
      console.log(this.formStudent.value)
    this.onSubmitStudent.emit(createStudent);

     //observable cuandos se crea un registro nuevo
     this.sub=this.studentService.refreshForm$.subscribe(()=>{
      this.formStudent.reset();
  });
    return;
  }
    //validate input
    get nameNotValid(){
        return this.formStudent.get('name')?.invalid && this.formStudent.get('name')?.touched;
    }

    get lastNameNotValid(){
    return this.formStudent.get('last_name')?.invalid && this.formStudent.get('last_name')?.touched;
    }
    get identificationNotValid(){
        return this.formStudent.get('identification')?.invalid && this.formStudent.get('identification')?.touched;
    }
    get cellPhoneNotValid(){
        return this.formStudent.get('cell_phone')?.invalid && this.formStudent.get('cell_phone')?.touched;
    }
    get AddressNotValid(){
        return this.formStudent.get('address')?.invalid && this.formStudent.get('address')?.touched;
    }
    get userIdNotValid(){
        return this.formStudent.get('user_id')?.invalid && this.formStudent.get('user_id')?.touched;
    }
    get emailNotValid(){
        return this.formStudent.get('email')?.invalid && this.formStudent.get('email')?.touched;
    }

}
