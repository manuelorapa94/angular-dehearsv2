import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from '../../guards/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { error } from 'console';

interface User {
  email: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [HttpClientModule, CommonModule],
})
export class DashboardComponent implements OnInit {
  public users: any = [];

  constructor(private authServices: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get(`${this.authServices.baseUrl}/User`).subscribe(
      (res: any) => {
        this.users = res.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  logout() {
    this.authServices.logout();
  }
}
