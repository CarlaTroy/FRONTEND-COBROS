import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/admin/servicios/usuario.service';
import { UserFullDTO } from 'src/app/admin/student/student';
import Swal from 'sweetalert2';
import { GroupDTO, UserCreateDTO} from '../../user';



@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  @Input() modeForm!:string;
    @Input() modelCohorteseFull!:UserFullDTO;
    ListarGrupos:GroupDTO[]=[];
    selectedGroup!:GroupDTO;
    courseIdSelected!: number;
    courseNameSelected: string = '';

    //output
   @Output() onSubmitCohorte:EventEmitter<UserCreateDTO>=new EventEmitter<UserCreateDTO>();
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
    filterValue = '';
  constructor(private formBuilder: FormBuilder,
                private usuarioService:UsuarioService,
                private cohorteService:UsuarioService,)
                {
                }

  ngOnInit(): void {
    this.getAllGroups();
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

  getAllGroups(){
    debugger
    this.usuarioService.obtenerTodosGrupos().subscribe(response=>{
        debugger
        this.ListarGrupos=response.data;
        console.log(response);
    },error=>{
        debugger
        console.log(error);
    });
  }
  loadDataForm(){

        this.formCohorte.patchValue(this.modelCohorteseFull);
        //this.courseNameSelected = this.modelCohorteseFull.user.username;
        //this.courseIdSelected = this.modelCohorteseFull.user.id;

  }

  // function personality
  initInputForm(){
    this.formCohorte = this.formBuilder.group({
        username: ['', [Validators.required, Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.maxLength(10)]],
        gruop:['', [Validators.required]],
        password2: ['', [Validators.required,Validators.maxLength(10)]],
        is_staff: [true, [Validators.required]],
      }, {
        validators: this.comparandoPassword('password', 'password2')
      });
  }


    comparandoPassword(password: string, password2: string){

    return (group: FormGroup) => {

      let contra1 = group.controls[password].value;
      let contra2 = group.controls[password2].value;

      if(contra1 === contra2){
        return null;
      }

      return {
        comparandoPassword: true
      };
    };
  }

  handleChange(e: any) {
    let isChecked = e.checked;
    console.log(isChecked)
    this.formCohorte.value.is_staff = isChecked
  }

  checarSiSonIguales():  boolean  {
    return  this.formCohorte.hasError('comparandoPassword')  &&
      this.formCohorte.get('password')!.dirty &&
      this.formCohorte.get('password2')!.dirty;
  }

  onChange(event: any) {
    if(!event.value) return
    this.courseIdSelected = Number.parseInt(event.value.id)
    this.courseNameSelected = event.value.username

  }


  submitCohorte(){

    console.log(this.formCohorte.value)

    if(this.formCohorte.invalid){
        this.Toast.fire({
            icon: 'warning',
            title: 'Debe completar todos los campos correctamente'
        })
        return Object.values(this.formCohorte.controls).forEach(contol=>{
            contol.markAsTouched();
        });
    }

    /* this.formCohorte.value.course_id = this.courseIdSelected
    const createCourse:CohorteCreateDTO=this.formCohorte.value
    this.onSubmitCohorte.emit(createCourse);*/
    //this.formCohorte.value.user_id= this.courseIdSelected

  const createCourse:UserCreateDTO={
        username:this.formCohorte.value.username,
        email:this.formCohorte.value.email,
        password:this.formCohorte.value.password,
        password2:this.formCohorte.value.password2,
        is_staff:this.formCohorte.value.is_staff
      }

    this.onSubmitCohorte.emit(createCourse);

    //observable cuandos se crea un registro nuevo
    this.sub=this.cohorteService.refreshTable$.subscribe(()=>{
      this.formCohorte.reset();
  });

    return;
  }
    //validate input
    get usernameNotValid(){
        return this.formCohorte.get('username')?.invalid && this.formCohorte.get('username')?.touched;
    }

    get emailNotValid(){
    return this.formCohorte.get('email')?.invalid && this.formCohorte.get('email')?.touched;
    }
    get passwordNotValid(){
        return this.formCohorte.get('password')?.invalid && this.formCohorte.get('password')?.touched;
    }
    get password2NotValid(){
        return this.formCohorte.get('password2')?.invalid && this.formCohorte.get('password2')?.touched;
    }
    get is_staffNotValid(){
        return this.formCohorte.get('is_staff')?.invalid && this.formCohorte.get('is_staff')?.touched;
    }

}
