import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, retryWhen, share, switchMap, take, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../auth.service';
const TOKEN_HEADER_KEY = 'x-access-token';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {


   tokenRefreshVM ={ 
    Token: localStorage.getItem('token_Value'),
    RefreshToke: localStorage.getItem('Saverefreshtokene')
}
  
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  retryRequest: any;

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
debugger;
    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    let token: string | null = localStorage.getItem("token_Value");
    if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next.handle(request);
}
  
}
