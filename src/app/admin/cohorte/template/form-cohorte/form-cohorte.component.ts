import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CourseFullDTO} from 'src/app/admin/course/course';
import { CohorteService } from 'src/app/admin/servicios/cohorte.service';
import Swal from 'sweetalert2';
import { CohorteCreateDTO, CohorteFullDTO } from '../../cohorte';
import { CourseService } from 'src/app/admin/servicios/course.service';

@Component({
  selector: 'app-form-cohorte',
  templateUrl: './form-cohorte.component.html',
  styleUrls: ['./form-cohorte.component.scss']
})
export class FormCohorteComponent implements OnInit {
    @Input() modeForm!:string;
    @Input() modelCourseFull!:CourseFullDTO[];
    @Input() modelCohorteseFull!:CohorteFullDTO;
    
    courseIdSelected!: number;
    courseNameSelected: string = '';

    //output
   @Output() onSubmitCohorte:EventEmitter<CohorteCreateDTO>=new EventEmitter<CohorteCreateDTO>();
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
                private cohorteService:CohorteService,) 
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
    
  }
  OnDestroy(): void {
    if(this.sub) {
        this.sub.unsubscribe();
    }
  }

  loadDataForm(){
  
        this.formCohorte.patchValue(this.modelCohorteseFull);
      this.courseNameSelected = this.modelCohorteseFull.course.name;
      this.courseIdSelected = this.modelCohorteseFull.course.id;
    
  }

  // function personality
  initInputForm(){
    this.formCohorte = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(100)]],
        date_init: ['', [Validators.required]],
        date_end: ['', [Validators.required]],
        cost_effective: ['', [Validators.required,Validators.min(0)]],
        cost_credit: ['', [Validators.required,Validators.min(0)]],
        course_id: ['', [Validators.required]],
      });
  }


  
  onChange(event: any) {
    if(!event.value) return
    console.log(event.value['id'])
    this.courseIdSelected = event.value['id']
    this.courseNameSelected = event.value['name']
    //this.formParroquia.value.fk_canton_id.id = Number(event.value['id'])
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

    /*console.log(this.formCohorte.value)
    this.formCohorte.value.course_id = this.courseIdSelected
    const createCourse:CohorteCreateDTO=this.formCohorte.value
    this.onSubmitCohorte.emit(createCourse);*/

   
  const createCourse:CohorteCreateDTO={
      name:this.formCohorte.value.name,
        cost_credit:this.formCohorte.value.cost_credit,
        cost_effective:this.formCohorte.value.cost_effective,
        course_id:this.courseIdSelected,
        date_end:this.formCohorte.value.date_end,
        date_init:this.formCohorte.value.date_init
    }

    this.onSubmitCohorte.emit(createCourse);

    //observable cuandos se crea un registro nuevo
    this.sub=this.cohorteService.refreshForm$.subscribe(()=>{
      this.formCohorte.reset();
  });
  
    return;
  }
    //validate input
    get nameNotValid(){
        return this.formCohorte.get('name')?.invalid && this.formCohorte.get('name')?.touched;
    }

    get dateInitNotValid(){
    return this.formCohorte.get('date_init')?.invalid && this.formCohorte.get('date_init')?.touched;
    }
    get dateEndNotValid(){
        return this.formCohorte.get('date_end')?.invalid && this.formCohorte.get('date_end')?.touched;
    }
    get costEffectiveNotValid(){
        return this.formCohorte.get('cost_effective')?.invalid && this.formCohorte.get('cost_effective')?.touched;
    }
    get costCreditNotValid(){
        return this.formCohorte.get('cost_credit')?.invalid && this.formCohorte.get('cost_credit')?.touched;
    }
    get courseNotValid(){
        return this.formCohorte.get('course_id')?.invalid && this.formCohorte.get('course_id')?.touched;
    }
}
