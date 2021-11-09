

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})


export class NotFoundComponent implements OnInit {

  constructor(private _Router: Router) { }

  isLogin:boolean = false;
  UserLoged:any;

  ngOnInit(): void {

    this.UserLoged = localStorage.getItem('UserToken');
    if(this.UserLoged){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
    
  }


  OpenLogin(){
    if(this.isLogin){
      this._Router.navigate(['home'])
    }else {
      this._Router.navigate(['sign-in'])
    }
  }
}

