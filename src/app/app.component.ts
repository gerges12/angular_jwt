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
  constructor(
    private router: Router,
    private token: TokenStorageService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('ar');
  }

  ngOnInit() {}
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
}
