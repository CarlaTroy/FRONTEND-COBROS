import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/admin/servicios/usuario.service';
import { LayoutService } from 'src/app/services/app.layout.service';

@Component({
  providers: [MessageService],
    selector: 'app-topbar-principal',
    templateUrl: './topbar-principal.component.html',
    styleUrls: ['./topbar-principal.component.scss'],
})
export class TopbarPrincipalComponent implements OnInit {
    login: boolean = true;
    token = localStorage.getItem('token');
    usuarioLogueado: any = localStorage.getItem('name');
    selected!: any;

    items: MenuItem[] = [
        {
            icon: 'pi pi-user',
            items: [
            
            /*{
              label: 'Dashboard',
              icon: 'pi pi-fw pi-external-link',
              routerLink: ['/admin'],
               id: '1',
            },*/
                {
                    label: 'Salir',
                    icon: 'pi pi-fw pi-external-link',
                    id: '2',
                },
            ],
        },
    ];

    constructor(
        public layoutService: LayoutService,
        public usuarioSevice: UsuarioService,
        private messageService: MessageService,
        public router: Router
    ) {}

    ngOnInit(): void {
        if (this.router.url == '/principal' || '/') {
            this.login = true;
        }
        if (this.router.url === '/auth/login') {
            this.login = false;
        }
    }

    obtenerPrimeraLetra(): string {
        return this.usuarioLogueado.charAt(0).toUpperCase();
    }

    logout() {


        this.usuarioSevice.logout().subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Debes iniciar sesión',
                });
            }
        );
    }
}
