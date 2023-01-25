import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CourseFullDTO, obtenerDropdownCourseDTO } from 'src/app/admin/course/course';
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
    @Input() modelCohorteFull!:CohorteFullDTO;
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
                private cohorteService:CohorteService,
                private courseService:CourseService,) 
                {
                  this.cantones = [];
                }

  ngOnInit(): void {
    console.log('this.modelCourseFull')
    console.log(this.modelCourseFull)
    this.cargarCourses();
    this.initInputForm();
      //si existe data entonces en modo edicion
      if(this.modelCohorteFull){
        this.loadDataForm();
        return;
      }
      //modo creacion
      if(!this.modelCohorteFull){
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
    console.log('this.modelcreateCohorteFULL')
    console.log(this.modelCohorteseFull)
    if(this.modelCohorteseFull != undefined){
        //this.formParroquia.value.fk_canton_id = this.modelCohorteseFull.fk_canton.id

        this.modelcreateCohorteDTO = {
          name: this.modelCohorteseFull.name,
          date_init: this.modelCohorteseFull.date_init,
          date_end: this.modelCohorteseFull.date_end,
          cost_effective: this.modelCohorteseFull.cost_effective,
          cost_credit: this.modelCohorteseFull.cost_credit,
          course_id: this.modelCohorteseFull.course.id,
        }
        this.cantonSelected = this.modelCohorteseFull.course.id
        this.selectedCountry = this.modelCohorteseFull.course.name
      }

      console.log('this.modelcreateCohorteDTO')
      console.log(this.modelcreateCohorteDTO)
      if(this.modelcreateCohorteDTO!=undefined || this.modelcreateCohorteDTO!=null){

          console.log('this.modelCohorteseFull')
          console.log(this.modelcreateCohorteDTO)
        this.formCohorte.patchValue(this.modelcreateCohorteDTO);

       // setTimeout(() => {
          

            for (let i = 0; i < this.listarCantones.length; i++) {
                if(this.listarCantones[i].id === this.modelCohorteseFull.course.id){
                    console.log('patch')
                    console.log(this.cantones[i].name)
                    console.log(this.modelCohorteseFull.course.name)
                  if(this.cantones[i].name === this.modelCohorteseFull.course.name){
                    this.selectedCountry=this.cantones[i].name
                    this.cantones.splice(i,1)
                    this.cantones.unshift({name: this.listarCantones[i].name, id: this.listarCantones[i].id})
                    //this.formProductor.value.fk_canton_id = Number(this.listarCantones[i].id)
                    this.cantonSelected = this.listarCantones[i].id
                    this.formCohorte.controls['course_id'].setValue(Number(this.listarCantones[i].id));
                  }
                }

              }
             //  }, 1000);
      }

  }

  // function personality
  loadDataForm(){
    this.formCohorte.patchValue(this.modelCohorteFull);
    this.intanceCourse=this.modelCohorteFull.course;
  }
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


  cargarCourses():void{
    this.courseService.getAll().subscribe(cantones=>{
      this.listarCantones=cantones.data;
    //console.log(cantones.data)

      for (let i = 0; i < cantones.data.length; i++) {
        let mapa = {id: cantones.data[i].id, name: cantones.data[i].name}
        this.cantones.push(mapa)
        }
    },error=>{
      //this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
    });

  }
  onChange(event: any) {
    if(!event.value) return
    console.log(event.value['id'])
    this.cantonSelected = event.value['id']
    this.selectedCountry = event.value['name']
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

    console.log(this.formCohorte.value)
    this.formCohorte.value.course_id = this.cantonSelected
    const createCourse:CohorteCreateDTO=this.formCohorte.value
    this.onSubmitCohorte.emit(createCourse);


    /*const createCourse:CohorteCreateDTO={
        name:this.formCohorte.value.name,
        cost_credit:this.formCohorte.value.cost_credit,
        cost_effective:this.formCohorte.value.cost_effective,
        course_id:this.intanceCourse.id,
        date_end:this.formCohorte.value.date_end,
        date_init:this.formCohorte.value.date_init
    }*/
    //this.onSubmitCohorte.emit(createCourse);
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
