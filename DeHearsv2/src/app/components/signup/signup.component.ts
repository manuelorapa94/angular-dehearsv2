import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../guards/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private rout: Router, private toast: NgToastService, private authservices: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSignUp() {
    if (this.signupForm.valid) {
      this.http.post(`${this.authservices.baseUrl}/User`, this.signupForm.value).subscribe({
        next: (res) => {
          this.signupForm.reset();
          this.toast.success({detail: "SUCCESS", summary: "Sign Up Successful!", duration: 5000});
          this.rout.navigate(['login']);
        },
        error: (err) => {
          this.toast.error({detail: "ERROR", summary: err?.error.message, duration: 5000});
        },
      });
    } else {
      ValidateForm.validateAllFormsFields(this.signupForm);
    }
  }
}
