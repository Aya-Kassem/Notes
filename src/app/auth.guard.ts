import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FormService } from './form.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private _FormService:FormService, private _Router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

      // let x = localStorage.getItem('UserToken');
    if(this._FormService.decodeData.getValue() != null){
      return true;
    }else {
      this._Router.navigate(['sign-in'])
      return false;
    }
  
  }
  
}
