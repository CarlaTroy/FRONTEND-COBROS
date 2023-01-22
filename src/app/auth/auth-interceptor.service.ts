import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UsuarioService } from '../admin/servicios/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private router: Router, private usuarioService:UsuarioService) { }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: any = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Token ${ token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('err')
        console.log(err)

        if (err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/principal']);
        }
        /*if(err.status === 500){
        this.usuarioService.checkServerStatus();
        }*/

        return throwError( err );

      })
    );
  }
}
