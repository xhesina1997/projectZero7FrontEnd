import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const re = '/authenticate';
    if (request.url.search(re) === -1 ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });
    }

    return next.handle(request);
  }
}
