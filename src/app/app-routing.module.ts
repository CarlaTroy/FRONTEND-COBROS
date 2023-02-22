import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AdminComponent } from './admin/admin.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './guard/auth.guard';


@NgModule({
    imports: [

        RouterModule.forRoot([
            { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
            //{path: '', component: AdminComponent},
            { path: "admin",component:AdminComponent,children:[
                { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                { path: 'user', loadChildren: () => import('./admin/user/user.module').then(m => m.UserModule) },
                { path: 'student', loadChildren: () => import('./admin/student/student.module').then(m => m.StudentModule) },
                { path: 'enrollement', loadChildren: () => import('./admin/enrollement/enrollement.module').then(m => m.EnrollementModule) },

                { path: 'course', loadChildren: () => import('./admin/course/course.module').then(m => m.CourseModule) },
                { path: 'cohorte', loadChildren: () => import('./admin/cohorte/cohorte.module').then(m => m.CohorteModule) },
                { path: 'report', loadChildren: () => import('./admin/report/report.module').then(m => m.ReportModule) },
            ],canActivate: [AuthGuard]},
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
