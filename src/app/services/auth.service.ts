import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GLOBALS } from '../utills/global.constants';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})


export class AuthService {

  token: any
  private clearChatSubject = new Subject<void>();

  clearChat$ = this.clearChatSubject.asObservable();

  emitClearChat() {
    this.clearChatSubject.next();
  }
  constructor(private httpClient: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error && error.error.code === "-1") {
          // Clear localStorage
        
          localStorage.clear();
          // Redirect to login or appropriate route
          // this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
  login = (body: any): Observable<any> => {
    console.log("------------------hello in enter api");
    
    return this.httpClient.post(`${environment.API_URL}${GLOBALS.LOGIN_URL}`, body, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': '2VOZ6okReKyWPj4oQFqJui0DkcrYlivttrOK/4iBTD4='
      }
    })
  }
  signup = (body: any): Observable<any> => {
    return this.httpClient.post(`${environment.API_URL}${GLOBALS.SIGN_UP}`, body, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': '2VOZ6okReKyWPj4oQFqJui0DkcrYlivttrOK/4iBTD4='
      }
    })
  }
  logout = (): Observable<any> => {
    this.token = localStorage.getItem('token')
    return this.httpClient.post(`${environment.API_URL}${GLOBALS.LOGOUT}`, {}, {

      headers: {
        'Content-Type': 'application/json',
        'api-key': '2VOZ6okReKyWPj4oQFqJui0DkcrYlivttrOK/4iBTD4=',
        'token': this.token
      }
    })
  }
  validateToken = (body: any): Observable<any> => {
    return this.httpClient.post(`${environment.API_URL}${GLOBALS.check_token}`, body, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': '2VOZ6okReKyWPj4oQFqJui0DkcrYlivttrOK/4iBTD4=',
        'token': this.token

      }
    })
  }


  sendMsg = (body: any): Observable<any> => {
    this.token = localStorage.getItem('token') || ''
    return this.httpClient.post(`${environment.API_URL}${GLOBALS.CHAT_WITH_GEMINI}`, body, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': '2VOZ6okReKyWPj4oQFqJui0DkcrYlivttrOK/4iBTD4=',
        'token': this.token
      }
    })
  }


  clearChatdata = (body:any): Observable<any> => {
    this.token = localStorage.getItem('token') || ''
    return this.httpClient.post(`${environment.API_URL}${GLOBALS.CLEAR_CHAT_DATA}`,body, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': '2VOZ6okReKyWPj4oQFqJui0DkcrYlivttrOK/4iBTD4=',
        'token': this.token
      }
    })
  }



  getGeminiMsg = (body: any): Observable<any> => {
    this.token = localStorage.getItem('token')
    
    return this.httpClient.post(`${environment.API_URL}${GLOBALS.GET_GEMINI_DATA}`, body, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': '2VOZ6okReKyWPj4oQFqJui0DkcrYlivttrOK/4iBTD4=',
        'token': this.token
  
      }
    })
  }
}
