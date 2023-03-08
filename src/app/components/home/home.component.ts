import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  langs: any[] | undefined;

  selectedLang: any;

  constructor(private router: Router, private translate: TranslateService) {}

  ngOnInit(): void {}

  changeLanguage(event: any) {
    this.translate.use(event.target.value);
  }
}
