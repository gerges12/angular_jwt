import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const USERID_KEY = 'AuthUserid';
const USERTYPE_KEY = 'AuthUserType';

const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() {}

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public saveUserid(userid: string) {
    window.sessionStorage.removeItem(USERID_KEY);
    window.sessionStorage.setItem(USERID_KEY, userid);
  }

  public getUsername(): string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public getUserid(): string | any {
    return sessionStorage.getItem(USERID_KEY);
  }

  public saveUsertype(usertype: string) {
    window.sessionStorage.removeItem(USERTYPE_KEY);
    window.sessionStorage.setItem(USERTYPE_KEY, usertype);
  }

  public getUsertype(): string | any {
    return sessionStorage.getItem(USERTYPE_KEY);
  }
}
