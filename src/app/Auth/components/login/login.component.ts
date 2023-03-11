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
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  message: string | undefined;

  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private auth: AuthService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService,
    private translate: TranslateService
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

  addSingle() {
    this.messageService.add({
      severity: 'error',
      detail: this.message,
    });
  }

  submitForm() {
    this.auth.login(this.form.value).subscribe(
      (data: LoginResponse) => {
        this.tokenStorage.saveToken(data.authenticationToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveUserid(data.userid);
        this.tokenStorage.saveUsertype(data.userType);

        if (data.userType == 'client') {
          this.router.navigate(['/client']);
        } else {
          this.router.navigate(['/employee']);
        }
      },
      (error) => {
        console.log('hhh', error);
        this.message = this.translate.instant(error.error.message);
        this.addSingle();
      }
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // window.location.reload();
  }
}
