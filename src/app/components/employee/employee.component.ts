import { TokenStorageService } from './../../Auth/services/token-storage.service';
import { TransactionsService } from './../../services/transactions.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private trans: TransactionsService,
    private token: TokenStorageService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.trans.pendingTransaction().subscribe((data) => {
      this.transactions = data;
    });

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      userid: this.token.getUserid(),
    };
  }

  addSingle() {
    this.messageService.add({
      severity: this.message,
      summary: 'Service Message',
      detail: this.message,
    });
  }

  accepttransaction(transactionId: number) {
    this.trans.acceptToTransaction(transactionId).subscribe((data) => {
      this.message = this.translate.instant(data);
      this.addSingle();
      console.log('replaing of transaction is ', data);
    });
  }

  rejecttransaction(transactionId: number) {
    console.log('fgdd', transactionId);

    this.trans.rejectToTransaction(transactionId).subscribe(
      (data) => {
        this.message = this.translate.instant(data);
        this.addSingle();
      },
      (error) => {}
    );
  }
}
