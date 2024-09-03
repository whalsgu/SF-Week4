import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:8888'; // Adjust if necessary

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userid: number = 0;
  username: string = '';
  userbirthdate: string = '';
  userage: number = 0;

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
    if (!sessionStorage.getItem('username')) {
      this.router.navigate(['/login']);
      return;
    }

    this.username = sessionStorage.getItem('username') || '';

    this.httpClient.post<any>(`${BACKEND_URL}/login`, {
      username: this.username,
      password: sessionStorage.getItem('password') || '' // Adjust if you store password
    }).subscribe((data: any) => {
      if (data.ok) {
        this.userbirthdate = data.userbirthdate || '';
        this.userage = data.userage || 0;
        this.userid = data.userid || 0;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  editFunc() {
    const userobj = {
      userid: this.userid,
      username: this.username,
      userbirthdate: this.userbirthdate,
      userage: this.userage
    };

    this.httpClient.post<any>(`${BACKEND_URL}/loginafter`, userobj)
      .subscribe((response: any) => {
        if (response && response.length) {
          sessionStorage.setItem('username', this.username);
          sessionStorage.setItem('userbirthdate', this.userbirthdate);
          sessionStorage.setItem('userage', this.userage.toString());
          alert("User updated successfully!");
        } else {
          alert("Failed to update user.");
        }
      });
  }
}
