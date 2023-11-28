import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private authService : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {

      const token=this.authService.getToken();

      const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(authReq);
  } else {
      return next.handle(req);
  }
  }
}
