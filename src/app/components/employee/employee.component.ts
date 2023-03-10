import { TokenStorageService } from './../../Auth/services/token-storage.service';
import { TransactionsService } from './../../services/transactions.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  transactions!: any[];
  info: any;
  message: string | undefined;
  isEmployee: boolean | undefined;

  constructor(
    private trans: TransactionsService,
    private token: TokenStorageService,
    private messageService: MessageService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDataTable();
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      userid: this.token.getUserid(),
    };
    if (this.token.getUsertype() == 'employee') {
      this.isEmployee = true;
    }
  }

  addSingle() {
    this.messageService.add({
      severity: 'success',
      detail: this.message,
    });
  }

  addErrorMessage() {
    this.messageService.add({
      severity: 'error',
      detail: this.message,
    });
  }

  accepttransaction(transactionId: number) {
    this.trans.acceptToTransaction(transactionId).subscribe(
      (data) => {
        this.message = this.translate.instant(data.message);
        this.addSingle();
        this.loadDataTable();
      },
      (error) => {
        this.message = this.translate.instant(error.error.message);
        this.addErrorMessage();
      }
    );
  }

  rejecttransaction(transactionId: number) {
    console.log('fgdd', transactionId);

    this.trans.rejectToTransaction(transactionId).subscribe(
      (data) => {
        this.message = this.translate.instant(data);
        this.addSingle();
        this.loadDataTable();
      },
      (error) => {}
    );
  }

  loadDataTable() {
    this.trans.pendingTransaction().subscribe((data) => {
      this.transactions = data;
    });
  }
}
