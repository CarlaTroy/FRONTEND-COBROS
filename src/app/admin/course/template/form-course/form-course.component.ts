import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-course',
  templateUrl: './form-course.component.html',
  styleUrls: ['./form-course.component.scss']
})
export class FormCourseComponent implements OnInit {
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

  constructor(private formBuilder: FormBuilder,) { }
    //functon defaul angular
  ngOnInit(): void {
    this.initInputForm();
  }
  // function personality
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
