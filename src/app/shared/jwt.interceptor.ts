import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/do';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // TODO: Add information about unAuthorized to user and redirect user.
          console.log('We intercepted a 401 boys!!!');
        }
        if (err.status === 404) {
          console.log(err.url);
          console.log('We intercepted a 404 boys!!!');
          const role = localStorage.getItem('Role');
          console.log(role);
          if (role === 'Group' && err.url.includes('contracts')) {
            console.log('Redirecting to newContract');
            this.router.navigateByUrl('contracts/newContract');
          }
        }
      }
    });
  }
}
