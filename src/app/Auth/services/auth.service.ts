import { LoginModel } from './../../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/model/loginResponse.model';
import { SignUpInfo } from 'src/app/model/SignUpInfo.model';
import { SignUpResponse } from 'src/app/model/SignUpResponse.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  base_url: string = 'http://localhost:8080/MIS/user/login';
  signup_url: string = 'http://localhost:8080/MIS/user/signup';

  constructor(private http: HttpClient) {}

  login(formValue: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.base_url, formValue, httpOptions);
  }
  signUp(info: SignUpInfo): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(this.signup_url, info, httpOptions);
  }
}
