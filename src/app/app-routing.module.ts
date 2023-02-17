import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AdminComponent } from './admin/admin.component';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [

        RouterModule.forRoot([
            { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
            //{path: '', component: AdminComponent},
            { path: "admin",component:AdminComponent,children:[
                { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                //{ path: 'usuario', loadChildren: () => import('./admin/usuario/usuario.module').then(m => m.UsuarioModule) },
                { path: 'user', loadChildren: () => import('./admin/user/user.module').then(m => m.UserModule) },
                { path: 'student', loadChildren: () => import('./admin/student/student.module').then(m => m.StudentModule) },
                { path: 'enrollement', loadChildren: () => import('./admin/enrollement/enrollement.module').then(m => m.EnrollementModule) },
                //{ path: 'produccion', loadChildren: () => import('./admin/produccion/produccion.module').then(m => m.ProduccionModule) },
                //{ path: 'resultados', loadChildren: () => import('./admin/resultados/resultados.module').then(m => m.ResultadosModule) },
                //{ path: 'costo-produccion', loadChildren: () => import('./admin/costo-produccion/costo-produccion.module').then(m => m.CostoProduccionModule) },
                { path: 'course', loadChildren: () => import('./admin/course/course.module').then(m => m.CourseModule) },
                { path: 'cohorte', loadChildren: () => import('./admin/cohorte/cohorte.module').then(m => m.CohorteModule) },
                { path: 'report', loadChildren: () => import('./admin/report/report.module').then(m => m.ReportModule) },
                //{ path: 'productores', loadChildren: () => import('./admin/productores/productores.module').then(m => m.ProductoresModule) },
                //{ path: 'intermediario-produccion', loadChildren: () => import('./admin/intermediario-produccion/intermediario-produccion.module').then(m => m.IntermediarioModule) },
                //{ path: 'intermediario', loadChildren: () => import('./admin/intermediario/intermediario.module').then(m => m.IntermediarioModule) },
                //{ path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                //{ path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                //{ path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
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
    exports: [RouterModule,ToolbarModule]
})
export class AppRoutingModule {
}
