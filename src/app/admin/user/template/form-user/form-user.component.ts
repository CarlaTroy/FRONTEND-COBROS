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

/*   @Input() modeForm!:string; */
    @Input() modelCohorteseFull!:UserFullDTO;
    ListarGrupos!:GroupDTO[];
    selectedGroup!:GroupDTO;
    courseIdSelected!: number;
    courseNameSelected: string = '';

    //output
   @Output() onSubmitCohorte:EventEmitter<UserCreateDTO>=new EventEmitter<UserCreateDTO>();
    //form
    formUser!:FormGroup;
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
    //this.loadDataForm();
    return;
  }
  //modo creacion
  if(!this.modelCohorteseFull){
    return;
  }

  }

  getAllGroups(){
    this.usuarioService.obtenerTodosGrupos().subscribe(response=>{
        this.ListarGrupos=response.data;
        console.log(response);
    },error=>{
        console.log(error);
    });
  }
  loadDataForm(){
    this.formUser.patchValue(this.modelCohorteseFull);
  }

  // function personality
  initInputForm(){
    this.formUser = this.formBuilder.group({
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
    this.formUser.value.is_staff = isChecked
  }

  checarSiSonIguales():  boolean  {
    return  this.formUser.hasError('comparandoPassword')  &&
      this.formUser.get('password')!.dirty &&
      this.formUser.get('password2')!.dirty;
  }

  onChange(event: any) {
    if(!event.value) return
    this.courseIdSelected = Number.parseInt(event.value.id)
    this.courseNameSelected = event.value.username

  }


  submitCohorte(){

    console.log(this.formUser.value)
    if(this.formUser.invalid){
        this.Toast.fire({
            icon: 'warning',
            title: 'Debe completar todos los campos correctamente'
        })
        return Object.values(this.formUser.controls).forEach(contol=>{
            contol.markAsTouched();
        });
    }

    const createCourse:UserCreateDTO={
        username:this.formUser.value.username,
        email:this.formUser.value.email,
        password:this.formUser.value.password,
        password2:this.formUser.value.password2,
        is_staff:this.formUser.value.is_staff,
        group:this.selectedGroup.name
    }

    this.onSubmitCohorte.emit(createCourse);

        //observable cuandos se crea un registro nuevo
        this.sub=this.cohorteService.refreshTable$.subscribe(()=>{
        this.formUser.reset();
    });

    return;
  }
    //validate input
    get usernameNotValid(){
        return this.formUser.get('username')?.invalid && this.formUser.get('username')?.touched;
    }

    get emailNotValid(){
    return this.formUser.get('email')?.invalid && this.formUser.get('email')?.touched;
    }
    get passwordNotValid(){
        return this.formUser.get('password')?.invalid && this.formUser.get('password')?.touched;
    }
    get password2NotValid(){
        return this.formUser.get('password2')?.invalid && this.formUser.get('password2')?.touched;
    }
    get is_staffNotValid(){
        return this.formUser.get('is_staff')?.invalid && this.formUser.get('is_staff')?.touched;
    }

    get groupNoValid(){
        return this.formUser.get('gruop')?.invalid && this.formUser.get('gruop')?.touched;
    }
    OnDestroy(): void {
        if(this.sub) {
            this.sub.unsubscribe();
        }
      }

}
