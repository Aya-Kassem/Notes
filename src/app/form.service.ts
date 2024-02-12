import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class FormService {
  apiKey: string = 'AIzaSyBhC55WofK_oj66143euASdOYgqHet1pPQ';
  constructor(private _HttpClient:HttpClient) {

    if( localStorage.getItem('UserToken') != null){
      this.userData()
    }
  }

  decodeData = new BehaviorSubject(null);

  SendingFormData(formData:{email: string, password: string}): Observable<any>{
    return this._HttpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
      'email': formData.email,
      'password': formData.password,
      'returnSecureToken': true
    })
  }
  SendingLoginData(formData:object): Observable<any>{
    return this._HttpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, formData)
  }
  userData(){
    let userToken = JSON.stringify(localStorage.getItem('UserToken'))
    this.decodeData.next( jwtDecode(userToken) )
  }
  deleteData(){
    localStorage.removeItem('UserToken')
    this.decodeData.next(null)
  }


}
