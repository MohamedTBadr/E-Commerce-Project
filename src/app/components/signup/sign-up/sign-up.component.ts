import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from '../../../services/registration';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  SignUpForm: FormGroup;
  constructor(public service: RegistrationService, public router: Router, private fb: FormBuilder) {
    this.SignUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  OnSubmit() {
    if (this.SignUpForm.invalid) {
      this.SignUpForm.markAllAsTouched(); // Show errors
      return;
    }

    this.service.register(this.SignUpForm.value).subscribe((res: any) => {
      // localStorage.setItem('token', res.token);
      this.router.navigate(['login']);
    });
  }
}
