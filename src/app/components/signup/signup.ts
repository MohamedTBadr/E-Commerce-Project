import { Component } from '@angular/core';
import { RegistrationService } from '../../services/registration';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
SignUpForm:FormGroup;
  constructor(public service : RegistrationService, public router : Router,private fb:FormBuilder){
    this.SignUpForm=this.fb.group({
      username: ['', Validators.required],
      email: ['',[Validators.required,Validators.email] ],
      password: ['', Validators.required]
    })
  } 

    OnSubmit(){
      if (this.SignUpForm.invalid) {
        this.SignUpForm.markAllAsTouched(); // Show errors
        return;
      }

      this.service.register(this.SignUpForm.value).subscribe((res:any)  => {
        // localStorage.setItem('token', res.token);
        this.router.navigate(['home']);
      });
    }
}
