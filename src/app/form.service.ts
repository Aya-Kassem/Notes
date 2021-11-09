import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private _HttpClient:HttpClient) {

    if( localStorage.getItem('UserToken') != null){
      this.userData()
    }
  }

  decodeData = new BehaviorSubject(null);

  SendingFormData(formData:object): Observable<any>{
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signup`, formData)
  }
  SendingLoginData(formData:object): Observable<any>{
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signin`, formData)
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
