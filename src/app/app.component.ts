import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './Auth/services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuth: boolean = false;

  constructor(
    private router: Router,
    private token: TokenStorageService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    if (this.token.getToken() != null) {
      this.isAuth = true;
    }
    console.log('status of ahtu', this.isAuth);
  }
  login() {
    this.router.navigateByUrl('auth/login');
  }
  logout() {
    this.token.signOut();
    this.router.navigateByUrl('/');
  }
  signup() {
    this.router.navigateByUrl('auth/signup');
  }

  IsAuth(): boolean {
    // window.location.reload();
    return this.isAuth;
  }
}
