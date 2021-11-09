import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';







@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
 
  notFound:string = '';
  componentPaths: string[] = ['#/home', '#/sign-in', '#/sign-up'];
  isValid:boolean = true;


  constructor(private _Location:Location){}
  ngOnInit(): void {
    this._Location.onUrlChange( (val) => {
      this.notFound = val;
      if(this.componentPaths.includes(this.notFound)){
        this.isValid = true;
      }
      else{
        this.isValid = false;
      }
    } )
  }
}
