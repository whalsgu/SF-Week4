import { Component } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import e from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    Users = [{username: 'testuser1', password:'testpassword'},
             {username: 'testuser2', password:'testpassword'},
             {username: 'testuser3', password:'testpassword'}]

    username = '';
    password = '';
    constructor(private router: Router){}

    itemClicked() {
      console.log(this.username, this.password);
      alert(`Username: ${this.username} and Password: ${this.password}`);
      let c = { username: this.username, password: this.password };
      let find = this.Users.some((e) => e.username === c.username);  
      alert(find);
  
      if (find) {
        this.router.navigateByUrl("/account");
      }
    }
  }