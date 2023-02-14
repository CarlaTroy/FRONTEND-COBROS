import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/admin/servicios/usuario.service';
import { LoginUsuarioDTO } from 'src/app/admin/user/user';
import Swal from 'sweetalert2';
@Component({
    providers: [MessageService],
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]


})
export class LoginComponent {
    formUsuario!:FormGroup;
    load: any = false;
    password!: string;

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


     token = localStorage.getItem('token');

    constructor(private router: Router, private formBuilder: FormBuilder,private messageService: MessageService, private usuarioService: UsuarioService) { }

    ngOnInit(): void {
        this.iniciarFormulario();

      }

    iniciarFormulario(){
        this.formUsuario = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
        });
      }
      login():void{
        if(this.formUsuario.invalid){
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe completar todos los campos'});
            return Object.values(this.formUsuario.controls).forEach(contol=>{
                contol.markAsTouched();
            });
        }
        //todo ok
        this.load = true;
        //console.log(this.formUsuario.value)
        let instanciaUsuario:LoginUsuarioDTO=this.formUsuario.value;
        this.load=true;
        this.usuarioService.login(instanciaUsuario).subscribe(response=>{
          this.load=false;
          this.Toast.fire({
            icon: 'success',
            title: response.message
          })
          this.router.navigate(['admin'])
          },error=>{
            this.load=false;
            this.messageService.add({severity:'error', summary: 'Error', detail: error});
          });

      }
    get usernameNoValido(){
        return this.formUsuario.get('username')?.invalid && this.formUsuario.get('username')?.touched;
    }

    get passwordNoValido(){
    return this.formUsuario.get('password')?.invalid && this.formUsuario.get('password')?.touched;
    }
}
