import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../services/app.layout.service';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Administrador',
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                    {
                        label: 'Cursos',
                        items: [
                            {
                                label: 'Gestionar', icon: 'pi pi-fw pi-book',
                                 routerLink: ['/admin/course']
                            },
                            {
                                label: 'Crear', icon: 'pi pi-fw pi-book',
                                 routerLink: ['/admin/course/create']
                            }
                        ],
                    },
                    {
                        label: 'Cohortes',
                        items: [
                            {
                                label: 'Gestionar', icon: 'pi pi-fw pi-th-large',
                                routerLink: ['/admin/cohorte']
                            },
                            {
                                label: 'Crear', icon: 'pi pi-fw pi-th-large',
                                 routerLink: ['/admin/cohorte/create']
                            }
                        ]
                    },

                    {
                        label: 'Estudiantes',
                        items: [
                            {
                                label: 'Gestionar', icon: 'pi pi-fw pi-users',
                                routerLink: ['/admin/student']
                            },
                            {
                                label: 'Crear', icon: 'pi pi-fw pi-users',
                                 routerLink: ['/admin/student/create']
                            }
                        ]
                    },

                    {
                        label: 'Matrículas',
                        items: [
                            {
                                label: 'Gestionar', icon: 'pi pi-fw pi-calendar',
                                routerLink: ['/admin/enrollement']
                            },
                            {
                                label: 'Crear', icon: 'pi pi-fw pi-calendar',
                                 routerLink: ['/admin/enrollement/create']
                            }
                        ]
                    },
                    {
                        label: 'Reportes',
                        items: [
                            {
                                label: 'Gestionar', icon: 'pi pi-fw pi-calendar',
                                routerLink: ['/admin/report']
                            },
                        ]
                    },

                    {
                        label: 'Usuarios',
                        items: [
                            {
                                label: 'Gestionar', icon: 'pi pi-fw pi-user',
                                routerLink: ['/admin/user']
                            },
                            {
                                label: 'Crear', icon: 'pi pi-fw pi-user',
                                 routerLink: ['/admin/user/create']
                            }
                        ]
                    },
                ]
            },
        ];
    }
}
