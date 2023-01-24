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
                        label: 'Cohorte',
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
                ]
            },
        ];
    }
}
