import { CourseFullDTO } from './../../course';
import { Subscription } from 'rxjs';
import { Component, EventEmitter, OnInit, Output, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/admin/servicios/course.service';
import Swal from 'sweetalert2';
import { CourseCreateDTO } from '../../course';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-course',
  templateUrl: './form-course.component.html',
  styleUrls: ['./form-course.component.scss']
})
export class FormCourseComponent implements OnInit {
    @Input() modeForm!:string;
    @Input() modelCourseFull!:CourseFullDTO;
    @Input() isSecretary!:boolean;
    //output
   @Output() onSubmitCourse:EventEmitter<CourseCreateDTO>=new EventEmitter<CourseCreateDTO>();
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
              private router:Router, 
                private courseService:CourseService) { }
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
 
    
  }
  OnDestroy(): void {
    if(this.sub) {
        this.sub.unsubscribe();
    }
  }
  // function personality
  loadDataForm(){
    this.formCourse.patchValue(this.modelCourseFull);
    console.log('this.modelCourseFull')
    console.log(this.modelCourseFull)
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
    console.log('createCourse')
    console.log(createCourse)
    this.onSubmitCourse.emit(createCourse);

    //observable cuandos se crea un registro nuevo
    this.sub=this.courseService.refreshForm$.subscribe(()=>{
      this.router.navigate(['/admin/course']);;
    });
    
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
