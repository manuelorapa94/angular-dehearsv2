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

interface LoginResponse {
  token: string;
  message: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  isLoggedInCon: boolean = false;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private rout: Router, private toast: NgToastService, private authservices: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin(): void{
    if (this.loginForm.valid) {
      this.http.post<LoginResponse>(`${this.authservices.baseUrl}/Login/authenticate`, this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();
          this.authservices.storeToken(res.token);
          // const token = this.authservices.getToken();
          this.authservices.islogin().subscribe((res1) => {
            if (this.authservices.isLoggedIn) {
              const redirectUrl = this.authservices.redirectUrl
                ? this.authservices.redirectUrl
                : '/dashboard';
              this.rout.navigate([redirectUrl]);
            }
          });
          this.toast.success({detail: "SUCCESS", summary: res.message, duration: 5000});
        },
        error: (err) => {
          this.toast.error({detail: "ERROR", summary: err?.error.message, duration: 5000});
        },
      });
    } else {
      ValidateForm.validateAllFormsFields(this.loginForm);
    }
  }
}
