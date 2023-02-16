import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../services/authentications/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser?.token) {
            if (request.url.indexOf(environment.api.substr(0, environment.api.length - 3)) > -1) {
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${currentUser.token}`
                }
              });
            }
          }
          return next.handle(request);
    }
}