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
                                label: 'Gestionar', icon: 'pi pi-fw pi-bookmark',
                                 routerLink: ['/admin/course']
                            },
                            {
                                label: 'Crear', icon: 'pi pi-fw pi-bookmark',
                                 routerLink: ['/admin/course/create']
                            }
                        ],
                    },
                    {
                        label: 'Cohortes',
                        items: [
                            {
                                label: 'Gestionar', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/admin/cohorte']
                            },
                            {
                                label: 'Crear', icon: 'pi pi-fw pi-bookmark',
                                 routerLink: ['/admin/cohorte/create']
                            }
                        ]
                    },

                    {
                        label: 'Estudiantes',
                        items: [
                            {
                                label: 'Gestionar', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/admin/student']
                            },
                            {
                                label: 'Crear', icon: 'pi pi-fw pi-bookmark',
                                 routerLink: ['/admin/student/create']
                            }
                        ]
                    },

                    {
                        label: 'Matrículas',
                        items: [
                            {
                                label: 'Gestionar', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/admin/matricula']
                            },
                            {
                                label: 'Crear', icon: 'pi pi-fw pi-bookmark',
                                 routerLink: ['/admin/matricula/create']
                            }
                        ]
                    },

                    {
                        label: 'Pagos',
                        items: [
                            {
                                label: 'Gestionar', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/admin/pago']
                            },
                            {
                                label: 'Crear', icon: 'pi pi-fw pi-bookmark',
                                 routerLink: ['/admin/pago/create']
                            }
                        ]
                    },

                    {
                        label: 'Reportes',
                        items: [
                            {
                                label: 'Gestionar', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/admin/reporte']
                            },
                            {
                                label: 'Crear', icon: 'pi pi-fw pi-bookmark',
                                 routerLink: ['/admin/reporte/create']
                            }
                        ]
                    },
                ]
            },
        ];
    }
}
