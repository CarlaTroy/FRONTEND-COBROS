import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CohorteCreateDTO, CohorteFullDTO } from '../../cohorte';

@Component({
  selector: 'app-form-cohorte',
  templateUrl: './form-cohorte.component.html',
  styleUrls: ['./form-cohorte.component.scss']
})
export class FormCohorteComponent implements OnInit {
    @Input() modeForm!:string;
    @Input() modelCohorteseFull!:CohorteFullDTO;
    //output
   @Output() onSubmitCourse:EventEmitter<CohorteCreateDTO>=new EventEmitter<CohorteCreateDTO>();
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
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.initInputForm();
  }
  OnDestroy(): void {
    if(this.sub) {
        this.sub.unsubscribe();
    }
  }
  // function personality
  initInputForm(){
    this.formCohorte = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(100)]],
        date_init: ['', [Validators.required]],
        date_end: ['', [Validators.required]],
        cost_effective: ['', [Validators.required]],
        cost_credit: ['', [Validators.required]]
      });
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
    let createCourse:CohorteCreateDTO=this.formCohorte.value;
    createCourse.course_id=1;
    this.onSubmitCourse.emit(createCourse);
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
}
