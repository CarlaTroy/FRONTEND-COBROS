import { CourseFullDTO } from './../../course';
import { Subscription } from 'rxjs';
import { Component, EventEmitter, OnInit, Output, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/admin/servicios/course.service';
import Swal from 'sweetalert2';
import { CourseCreateDTO } from '../../course';

@Component({
  selector: 'app-form-course',
  templateUrl: './form-course.component.html',
  styleUrls: ['./form-course.component.scss']
})
export class FormCourseComponent implements OnInit {
    @Input() modeForm!:string;
    @Input() modelCourseFull!:CourseFullDTO;
    //output
   @Output() onSubmitCourse:EventEmitter<CourseCreateDTO>=new EventEmitter<CourseCreateDTO>();
    isCreate:boolean=true;
   //form
   formCourse!:FormGroup;
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
  constructor(private formBuilder: FormBuilder,
                private courseService:CourseService,
              private activatedRoute:ActivatedRoute) { }
    //functon defaul angular
  ngOnInit(): void {
      //console.log(response);
      //modo creacion
      this.initInputForm();
      //si existe data entonces en modo edicion
      if(this.modelCourseFull){
        this.loadDataForm();
        return;
      }
      //modo creacion
      if(!this.modelCourseFull){
        return;
      }
    //observable cuandos se crea un registro nuevo
    this.sub=this.courseService.refreshForm$.subscribe(()=>{
        this.formCourse.reset();
    });
  }
  OnDestroy(): void {
    if(this.sub) {
        this.sub.unsubscribe();
    }
  }
  // function personality
  loadDataForm(){
    this.formCourse.patchValue(this.modelCourseFull);
  }
  submitCourse(){
    if(this.formCourse.invalid){
        this.Toast.fire({
            icon: 'warning',
            title: 'Debe completar todos los campos'
        })
        return Object.values(this.formCourse.controls).forEach(contol=>{
            contol.markAsTouched();
        });
    }
    const createCourse:CourseCreateDTO=this.formCourse.value;
    this.onSubmitCourse.emit(createCourse);
    return;
  }
  initInputForm(){
    this.formCourse = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', [Validators.required,Validators.maxLength(250)]]
      });
  }
  //validate input
    get nameNotValid(){
        return this.formCourse.get('name')?.invalid && this.formCourse.get('name')?.touched;
    }

    get descriptionNotValid(){
    return this.formCourse.get('description')?.invalid && this.formCourse.get('description')?.touched;
    }

}
