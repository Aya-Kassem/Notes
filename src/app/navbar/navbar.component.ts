import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;
  constructor(private _FormService:FormService) {}

  ngOnInit(): void {

    this._FormService.decodeData.subscribe((data)=>{
      if(data){
        this.isLogin = true;

      } else{
        this.isLogin = false;
      }
    })
  }

  logOut(){
    console.log(this.isLogin)
    this._FormService.deleteData()
  }
}
