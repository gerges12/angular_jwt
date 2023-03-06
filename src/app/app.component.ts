import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './Auth/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private token: TokenStorageService) {}

  ngOnInit() {}
  login() {
    this.router.navigateByUrl('auth/login');
  }
  logout() {
    this.token.signOut();
    window.location.reload();
  }
  signup() {
    this.router.navigateByUrl('auth/signup');
  }
}
