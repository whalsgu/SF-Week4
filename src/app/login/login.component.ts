import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const BACKEND_URL = 'http://localhost:8888';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router, private httpClient: HttpClient) {}

  submit() {
    let user = { username: this.email, password: this.password };
  
    this.httpClient.post<any>(BACKEND_URL + '/login', user, httpOptions)
      .subscribe({
        next: (data) => {
          console.log("Posting: ", JSON.stringify(user));
          console.log("Post Response: ", JSON.stringify(data));
  
          if (data.ok) {
            console.log("Login successful!");
  
            // Storing user data in sessionStorage
            if (data.userid) sessionStorage.setItem('userid', data.userid.toString());
            if (data.username) sessionStorage.setItem('username', data.username);
            if (data.userbirthdate) sessionStorage.setItem('userbirthdate', data.userbirthdate);
            if (data.userage) sessionStorage.setItem('userage', data.userage.toString());
  
            this.router.navigateByUrl("/account");
          } else {
            console.log("Login failed!");
            alert("Login failed! Please check your credentials.");
          }
        },
        error: (err) => {
          console.error("Error occurred:", err);
          alert("An error occurred while logging in.");
        }
      });
  }
  
}
