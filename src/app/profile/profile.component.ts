import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

const BACKEND_URL = 'http://localhost:8888'; // Adjust if necessary

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [FormsModule] // Add FormsModule to imports
})
export class ProfileComponent {
  userid: number = 0;
  username: string = '';
  userbirthdate: string = '';
  userage: number = 0;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeUser();
    }
  }

  initializeUser() {
    if (isPlatformBrowser(this.platformId)) {
      this.username = sessionStorage.getItem('username') || '';

      if (this.username) {
        this.httpClient.post<any>(`${BACKEND_URL}/getUser`, { username: this.username })
          .subscribe({
            next: (data: any) => {
              if (data.ok) {
                this.userbirthdate = data.userbirthdate || '';
                this.userage = data.userage || 0;
                this.userid = data.userid || 0;
              } else {
                console.error('Failed to fetch user data:', data.message);
              }
            },
            error: (error) => {
              console.error('Error fetching user data:', error);
            }
          });
      } else {
        console.error('No username found in sessionStorage');
      }
    }
  }

  editFunc() {
    if (isPlatformBrowser(this.platformId)) {
      const userobj = {
        userid: this.userid,
        username: this.username,
        userbirthdate: this.userbirthdate,
        userage: this.userage
      };

      this.httpClient.post<any>(`${BACKEND_URL}/updateUser`, userobj)
        .subscribe({
          next: (response: any) => {
            if (response && response.ok) {
              sessionStorage.setItem('username', this.username);
              sessionStorage.setItem('userbirthdate', this.userbirthdate);
              sessionStorage.setItem('userage', this.userage.toString());
              alert("User updated successfully!");
            } else {
              alert("Failed to update user.");
            }
          },
          error: (error) => {
            console.error('Error updating user:', error);
            alert("Failed to update user.");
          }
        });
    }
  }
}
