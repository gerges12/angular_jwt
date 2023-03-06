import { TokenStorageService } from './../../Auth/services/token-storage.service';
import { TransactionsService } from './../../services/transactions.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private trans: TransactionsService,
    private token: TokenStorageService
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

  accepttransaction(transactionId: number) {
    this.trans.acceptToTransaction(transactionId).subscribe((data) => {
      console.log('replaing of transaction is ', data);
      window.location.reload();
    });
  }

  rejecttransaction(transactionId: number) {
    console.log('fgdd', transactionId);

    this.trans.rejectToTransaction(transactionId).subscribe(
      (data) => {
        console.log('replying of transaction is ', data);
      },
      (error) => {}
    );
  }
}
