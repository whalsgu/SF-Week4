import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  username: string = '';
  userbirthdate: string = '';
  userage: number = 0;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      // Clear session storage
      sessionStorage.clear();
      
      // Redirect to the login page
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    // Retrieve user details from sessionStorage
    this.username = sessionStorage.getItem('username') || '';
    this.userbirthdate = sessionStorage.getItem('userbirthdate') || '';
    this.userage = Number(sessionStorage.getItem('userage')) || 0;
  }
}
