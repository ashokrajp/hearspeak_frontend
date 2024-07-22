import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GLOBALS } from '../utills/global.constants';
import { HttpClient } from '@angular/common/http';

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

  login = (body: any): Observable<any> => {
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
