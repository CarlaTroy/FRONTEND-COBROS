import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../services/app.layout.service';
import { UsuarioService } from './servicios/usuario.service';
import { MessageService } from 'primeng/api';



@Component({
    providers: [MessageService],
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    email: any = localStorage.getItem('email');
    usuarioLogueado: any = localStorage.getItem('username');
    tokenObtenido: any = localStorage.getItem('token');


    items: MenuItem[] = [
        {
            icon:'pi pi-cog',
            items:[
               /* {
                    label:'New',
                    icon:'pi pi-fw pi-plus',
                },
                {
                    label:'Delete',
                    icon:'pi pi-fw pi-trash'
                },
                {
                    separator:true
                },*/
                {
                    label:'Salir',
                    icon:'pi pi-fw pi-external-link',
                    /*command(event) {
                        localStorage.removeItem('token');
                        console.log('token eliminado')
                        window.location.href = '/auth/login';

                        }*/id:'1'
                }
            ]
        },
    ];

    constructor(public layoutService: LayoutService, public usuarioSevice: UsuarioService,
        private messageService: MessageService) { }

    ngOnInit() {
}

obtenerPrimeraLetra(): string {
    return this.usuarioLogueado.charAt(0).toUpperCase();
  }

logout(value: any){

    this.usuarioSevice.logout().subscribe((response) =>{
        console.log(response.data)
    },error=>{
        let message= error.error?.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
      });

}
}
