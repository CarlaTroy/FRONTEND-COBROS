import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
    imports: [

        RouterModule.forRoot([
            {path: '', component: PrincipalComponent},
            { path: "home",component:HomeComponent },
            { path: "principal",component:PrincipalComponent },
            { path: "admin",component:AdminComponent,children:[
                { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                { path: 'usuario', loadChildren: () => import('./admin/usuario/usuario.module').then(m => m.UsuarioModule) },
                { path: 'produccion', loadChildren: () => import('./admin/produccion/produccion.module').then(m => m.ProduccionModule) },
                { path: 'resultados', loadChildren: () => import('./admin/resultados/resultados.module').then(m => m.ResultadosModule) },
                { path: 'costo-produccion', loadChildren: () => import('./admin/costo-produccion/costo-produccion.module').then(m => m.CostoProduccionModule) },
                //{ path: 'canton', loadChildren: () => import('./admin/canton/canton.module').then(m => m.CantonModule) },
                { path: 'course', loadChildren: () => import('./admin/course/course.module').then(m => m.CourseModule) },
                { path: 'parroquia', loadChildren: () => import('./admin/parroquia/parroquia.module').then(m => m.ParroquiaModule) },
                { path: 'productores', loadChildren: () => import('./admin/productores/productores.module').then(m => m.ProductoresModule) },
                { path: 'intermediario-produccion', loadChildren: () => import('./admin/intermediario-produccion/intermediario-produccion.module').then(m => m.IntermediarioModule) },
                { path: 'intermediario', loadChildren: () => import('./admin/intermediario/intermediario.module').then(m => m.IntermediarioModule) },
                { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
            ]},
              {

                path: 'xx', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UikitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                ],
            },
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
