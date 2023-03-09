import { AuthService } from './../../services/auth.service';
import { SignUpInfo } from '../../../model/SignUpInfo.model';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

interface UserType {
  name: string;
  type: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  employeeType: UserType[] = [];
  selectedEmployeeType: string = '';
  message: string | undefined;

  selectedDate!: Date;
  signup: SignUpInfo = {
    name: '',
    username: '',
    email: '',
    password: '',
    phonenumber: 0,
    usertype: '',
  };
  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.employeeType = [
      { name: 'employee', type: 'employee' },
      { name: 'client', type: 'client' },
    ];
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      age: ['', Validators.required],
      usertype: new FormControl('', [Validators.required]), // u'll need to take the value from the object
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  userTypeVal() {
    let user: UserType;
    if (this.form.controls['usertype'].value) {
      user = this.form.controls['usertype'].value;
      this.selectedEmployeeType = user.name;
    }
  }

  addSingle() {
    this.messageService.add({
      severity: 'success',
      detail: this.message,
    });
  }

  FormSubmition() {
    if (this.form.valid) {
      this.userTypeVal();
      this.signup.email = this.form.controls['email'].value;
      this.signup.name = this.form.controls['name'].value;
      this.signup.password = this.form.controls['password'].value;
      this.signup.phonenumber = this.form.controls['phone'].value;
      this.signup.username = this.form.controls['username'].value;
      this.signup.usertype = this.selectedEmployeeType;
      this.auth.signUp(this.signup).subscribe(
        (data) => {
          this.message = data.message;
          this.addSingle();
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          this.message = error.error.message;
          this.addSingle();
        }
      );
    }
  }
  selected() {
    console.log('ya 3am enta ', this.selectedEmployeeType);
    // console.log('from change method', e.target.vlaue);
  }
}
