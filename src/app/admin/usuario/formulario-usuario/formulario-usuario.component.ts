import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearUsuarioDTO, EditUsuarioDTO, UsuarioDTO, obtenerUsuarioDTO } from '../usuario.model';



@Component({
  providers: [MessageService],
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss']
})
export class FormularioUsuarioComponent implements OnInit {

  submited: any = false;
  passwordEquals: boolean = false;
  //output
  @Output() onSubmitUsuario:EventEmitter<CrearUsuarioDTO>=new EventEmitter<CrearUsuarioDTO>();
  //input
  @Input() modeloUsuario!: EditUsuarioDTO;
  @Input() modeloUnaUsuario!: obtenerUsuarioDTO;


  @Input() tipoAccion!: string;
  //formulario
  formUsuario!:FormGroup;
  //
  idObtainForUpdate: string = '';

  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.aplicarPatch();
  }

  aplicarPatch(){

    if(this.modeloUnaUsuario != undefined){
      console.log('this.modeloUnaUsuario.id')
    console.log(this.modeloUnaUsuario.id)
    this.modeloUsuario = {
      id: this.modeloUnaUsuario.id,
      username: this.modeloUnaUsuario.username,
      email: this.modeloUnaUsuario.email,
      password: '',
      password2: '',
      is_staff: this.modeloUnaUsuario.is_staff
    }
    }

    if(this.modeloUsuario!=undefined || this.modeloUsuario!=null){
      this.formUsuario.patchValue(this.modeloUsuario);


    }
  }
  iniciarFormulario(){
    this.formUsuario = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      is_staff: ['false', Validators.required],
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


crearUsuario():void{
  this.submited = true;
  if((this.formUsuario.value.password == this.formUsuario.value.password2) && this.formUsuario.valid){
    this.passwordEquals = true;
      //todo ok
      this.formUsuario.controls['username'].setValue(this.formUsuario.value.username.toUpperCase());
 console.log(this.formUsuario.value)
 let instanciaUsuarioCrear:CrearUsuarioDTO=this.formUsuario.value;
 this.onSubmitUsuario.emit(instanciaUsuarioCrear);
  }
  
  if(!this.passwordEquals){
    this.passwordEquals = false;
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Las contraseñas no coinciden'});
  }

  if(this.formUsuario.invalid){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
    return;
  }



}

handleChange(e: any) {
  let isChecked = e.checked;
  console.log(isChecked)
  this.formUsuario.value.is_staff = isChecked
}

cerrarModal(){
  //this.dialogService.cerrarModal();
  this.ref.close();
}

get username(){ return this.formUsuario.get('username');}
get email(){ return this.formUsuario.get('email');}
get password(){ return this.formUsuario.get('password');}
get password2(){ return this.formUsuario.get('password2');}
get is_staff(){ return this.formUsuario.get('is_staff');}
}
