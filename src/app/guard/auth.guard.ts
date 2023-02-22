import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../admin/servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private usuarioService:UsuarioService,
        private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuthenticated =localStorage.getItem('token');// lógica de autenticación

        if (isAuthenticated) {
        return true;
        } else {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión
        this.router.navigate(['/auth/login']);
        return false;
        }
  }

}
