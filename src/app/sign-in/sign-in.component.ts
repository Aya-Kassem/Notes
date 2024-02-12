import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { FormService } from '../form.service';
import { Router } from '@angular/router'

declare var particlesJS: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private _FormService:FormService, private _Router:Router) { }

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/particlesjs-config.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }

  err:string = '';
  LoginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/)])
  })

  SubmitLoginForm( LoginForm:FormGroup ){
    if (LoginForm.valid) {
      this._FormService.SendingLoginData(LoginForm.value).subscribe({
        next: (val) => {
          if(val.idToken){
            localStorage.setItem('UserToken', val.idToken)
          this._FormService.userData();
          }
        },
        error: (err) => {
          this.err = err.error.error.message
        },
        complete: () => {
          this._Router.navigate(['home'])
        }
      })
    }
  }
}
