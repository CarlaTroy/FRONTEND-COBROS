import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CourseFullDTO } from 'src/app/admin/course/course';
import { StudentFullDTO } from 'src/app/admin/student/student';
import Swal from 'sweetalert2';
import { EnrollementCreateDTO, EnrollementFullDTO, TypePaysFullDTO } from '../../enrollement';
import { EnrollementService } from 'src/app/admin/servicios/enrollement.service';
import { MessageService } from 'primeng/api';
import { CohorteFullDTO } from 'src/app/admin/cohorte/cohorte';

@Component({
  providers: [MessageService],
  selector: 'app-form-enrollement',
  templateUrl: './form-enrollement.component.html',
  styleUrls: ['./form-enrollement.component.scss']
})
export class FormEnrollementComponent implements OnInit {

  @Input() modeForm!:string;
  @Input() modelStudentFull!:StudentFullDTO[];
  @Input() modelCohorteFull!:CohorteFullDTO[];
  @Input() modelTypePaysFull!:TypePaysFullDTO[];
  @Input() modelCohorteseFull!:EnrollementFullDTO;
  

  selectedStudent!: StudentFullDTO;
  selectedCohorte!: CohorteFullDTO;


  studentIdSelected!: number;
  studentNameSelected: string = '';


  typePayIdSelected!: number;
  typePayNameSelected: string = '';
  display: boolean = false;




  activateFieldCash: boolean = false;
  activateFieldCuotas: boolean = false;

  //output
 @Output() onSubmitCohorte:EventEmitter<EnrollementCreateDTO>=new EventEmitter<EnrollementCreateDTO>();
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
            public messageService: MessageService,
              private enrollementService:EnrollementService,) 
              {
              }


              

              showDialog() {
                  this.display = true;
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
  this.sub=this.enrollementService.refreshForm$.subscribe(()=>{
      this.formCohorte.reset();
  });
}
OnDestroy(): void {
  if(this.sub) {
      this.sub.unsubscribe();
  }
}

onRowSelect(event: any) {
  console.log(event.data)
  this.formCohorte.controls['student_id'].setValue(event.data.id);
  this.studentIdSelected = event.data.id
  this.messageService.add({severity: 'info', summary: 'Estudiante Selected', detail: event.data.name});
}

onRowSelectCohorte(event: any) {
  this.formCohorte.controls['cohorte_id'].setValue(event.data.id);
  console.log(event.data)
  this.messageService.add({severity: 'info', summary: 'Cohorte Selected', detail: event.data.name});
}
loadDataForm(){
console.log('this.modelCohorteseFull')
console.log(this.modelCohorteseFull)
      this.formCohorte.patchValue(this.modelCohorteseFull);
      this.studentNameSelected = this.modelCohorteseFull.student.name;
      this.studentIdSelected = this.modelCohorteseFull.student.id;
      
}

// function personality
initInputForm(){
  this.formCohorte = this.formBuilder.group({
      student_id: ['', [Validators.required, Validators.maxLength(100)]],
      cohorte_id: ['', [Validators.required]],
      tipe_pay_id: ['', [Validators.required]],
      cuotas: ['', [Validators.required,Validators.min(0)]],
      day_limite: ['', [Validators.required,Validators.min(0)]],
      cash: ['', [Validators.required]],
      discount: ['', [Validators.required]],
    });
}



onChange(event: any) {
  if(!event.value) return
  console.log(event.value.id)
  console.log(event.value.name)
  console.log(event.value.codigo)
  this.typePayIdSelected = Number.parseInt(event.value.id)
  this.typePayNameSelected = event.value.name

  if(event.value.codigo == '001'){
    this.activateFieldCuotas = true
  }else{
    this.activateFieldCuotas = false
  }
  if(event.value.codigo == '002'){
    this.activateFieldCash = true
  }else{
    this.activateFieldCash = false
  }
  
  
}


submitCohorte(){
  console.log('this.formCohorte.value')
    console.log(this.formCohorte.value)
    console.log(this.studentIdSelected)
  if(this.formCohorte.invalid){
      this.Toast.fire({
          icon: 'warning',
          title: 'Debe completar todos los campos'
      })
      return Object.values(this.formCohorte.controls).forEach(contol=>{
          contol.markAsTouched();
      });
  }

  /* this.formCohorte.value.course_id = this.studentIdSelected
  const createCourse:CohorteCreateDTO=this.formCohorte.value
  this.onSubmitCohorte.emit(createCourse);*/
  this.formCohorte.controls['tipe_pay_id'].setValue(this.typePayIdSelected);
  
 
const createCourse:EnrollementCreateDTO={
      student_id:this.formCohorte.value.student_id,
      cohorte_id:this.formCohorte.value.cohorte_id,
      tipe_pay_id:this.formCohorte.value.tipe_pay_id,
      cuotas:this.formCohorte.value.cuotas,
      day_limite:this.formCohorte.value.day_limite,
      cash:this.formCohorte.value.cash,
      discount:this.formCohorte.value.discount
    }
    console.log('this.formCohorte.value')
    console.log(this.formCohorte.value)
    
  this.onSubmitCohorte.emit(createCourse);
  return;
}
  //validate input
  get nameNotValid(){
      return this.formCohorte.get('student_id')?.invalid && this.formCohorte.get('student_id')?.touched;
  }

  get lastNameNotValid(){
  return this.formCohorte.get('cohorte_id')?.invalid && this.formCohorte.get('cohorte_id')?.touched;
  }
  get cashNotValid(){
      return this.formCohorte.get('cash')?.invalid && this.formCohorte.get('cash')?.touched;
  }
  get cuotasNotValid(){
      return this.formCohorte.get('cuotas')?.invalid && this.formCohorte.get('cuotas')?.touched;
  }
  get DayLimitNotValid(){
      return this.formCohorte.get('day_limite')?.invalid && this.formCohorte.get('day_limite')?.touched;
  }
  get userIdNotValid(){
      return this.formCohorte.get('cash')?.invalid && this.formCohorte.get('cash')?.touched;
  }
  get discountNotValid(){
        return this.formCohorte.get('discount')?.invalid && this.formCohorte.get('discount')?.touched;
    }
}
