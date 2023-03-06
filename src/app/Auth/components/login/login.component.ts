import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginResponse } from 'src/app/model/loginResponse.model';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private auth: AuthService,
    private tokenStorage: TokenStorageService
  ) {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  ngOnInit(): void {}
  submitForm() {
    this.auth.login(this.form.value).subscribe((data: LoginResponse) => {
      this.tokenStorage.saveToken(data.authenticationToken);
      this.tokenStorage.saveUsername(data.username);
      this.tokenStorage.saveUserid(data.userid);
      this.tokenStorage.saveUsertype(data.userType);
      // console.log(data);
    });

    this.logged();
  }
  logged() {
    this.router.navigateByUrl('employee');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // window.location.reload();
  }
}