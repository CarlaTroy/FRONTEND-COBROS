import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CourseFullDTO } from 'src/app/admin/course/course';
import { StudentFullDTO } from 'src/app/admin/student/student';
import Swal from 'sweetalert2';
import { EnrollementCreateDTO, EnrollementFullDTO } from '../../enrollement';
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
  @Input() modelCourseFull!:StudentFullDTO[];
  @Input() modelCohorteFull!:CohorteFullDTO[];
  @Input() modelCohorteseFull!:EnrollementFullDTO;
  

  selectedCustomer!: StudentFullDTO;
  selectedCohorte!: CohorteFullDTO;


  courseIdSelected!: number;
  courseNameSelected: string = '';
  display: boolean = false;


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
  this.messageService.add({severity: 'info', summary: 'Estudiante Selected', detail: event.data.name});
}

onRowSelectCohorte(event: any) {
  console.log(event.data)
  this.messageService.add({severity: 'info', summary: 'Cohorte Selected', detail: event.data.name});
}
loadDataForm(){
console.log('this.modelCohorteseFull')
console.log(this.modelCohorteseFull)
      this.formCohorte.patchValue(this.modelCohorteseFull);
      this.courseNameSelected = this.modelCohorteseFull.student.name;
      this.courseIdSelected = this.modelCohorteseFull.student.id;
  
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
 
const createCourse:EnrollementCreateDTO={
      student_id:this.formCohorte.value.student_id,
      cohorte_id:this.formCohorte.value.cohorte_id,
      tipe_pay_id:this.formCohorte.value.tipe_pay_id,
      cuotas:this.formCohorte.value.cuotas,
      day_limite:this.formCohorte.value.day_limite,
      cash:this.formCohorte.value.cash,
      discount:this.formCohorte.value.discount
    }
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
  get identificationNotValid(){
      return this.formCohorte.get('tipe_pay_id')?.invalid && this.formCohorte.get('tipe_pay_id')?.touched;
  }
  get cellPhoneNotValid(){
      return this.formCohorte.get('cuotas')?.invalid && this.formCohorte.get('cuotas')?.touched;
  }
  get AddressNotValid(){
      return this.formCohorte.get('day_limite')?.invalid && this.formCohorte.get('day_limite')?.touched;
  }
  get userIdNotValid(){
      return this.formCohorte.get('cash')?.invalid && this.formCohorte.get('cash')?.touched;
  }
  get discountNotValid(){
        return this.formCohorte.get('discount')?.invalid && this.formCohorte.get('discount')?.touched;
    }
}
