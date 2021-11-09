import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { FormService } from '../form.service';
import { Router } from '@angular/router'

declare var particlesJS: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit {

  constructor( private _FormService:FormService, private _Router:Router) { }

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/particlesjs-config.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }

  err:string = '';
  FormRegister:FormGroup = new FormGroup({

    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/)]),
    age: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{2}$')]),

  })

  SubmitReigisterForm( FormRegister:FormGroup ){
    if(FormRegister.valid){
      this._FormService.SendingFormData(FormRegister.value).subscribe((response)=>{

        if( response.message == 'success' ){
          this._Router.navigate(['sign-in'])
        }
        else{
          this.err = response.errors.email.message
        }
      })
    }
  }
}
