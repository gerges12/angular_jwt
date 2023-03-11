import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { TransActionInfo } from 'src/app/model/TransActionInfo.model';
import { TransactionsService } from 'src/app/services/transactions.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  display: boolean = false;

  transactions!: any[];

  info: any;
  form: any;
  transactionForm!: FormGroup;
  private transActionInfo!: TransActionInfo;
  message: string | undefined;
  isClient: boolean | undefined;

  constructor(
    private token: TokenStorageService,
    private transactionService: TransactionsService,
    private messageService: MessageService,
    private trans: TransactionsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadDataTable();
    this.transactionForm = new FormGroup({
      accountRecieverId: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      accountSenderId: new FormControl(this.token.getUserid()),
      transactionStatus: new FormControl('PENDING'),
    });

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      userid: this.token.getUserid(),
    };

    if (this.token.getUsertype() == 'client') {
      this.isClient = true;
    }
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  addSingle() {
    this.messageService.add({
      severity: 'success',
      detail: this.message,
    });
  }
  adderrorMessage() {
    this.messageService.add({
      severity: 'error',
      detail: this.message,
    });
  }

  showDialog() {
    this.display = true;
  }

  addTransaction() {
    this.transActionInfo = new TransActionInfo(
      this.transactionForm.value.accountreciever,
      this.transactionForm.value.accountsender,
      this.transactionForm.value.amount,
      this.transactionForm.value.status,
      this.transactionForm.value.description
    );

    if (this.transactionForm.valid) {
      this.transactionService
        .makeTransaction(this.transactionForm.value)
        .subscribe(
          (data) => {
            console.log(data.message);
            this.message = this.translate.instant(data.message);
            this.addSingle();
            this.loadDataTable();
          },
          (error) => {
            this.message = this.translate.instant(error.error.message);
            this.adderrorMessage();
          }
        );
    }
  }

  loadDataTable() {
    this.trans.replayedTransaction(this.token.getUserid()).subscribe((data) => {
      console.log('fgh', data);

      data.forEach((t: { transactionStatus: string }) => {
        t.transactionStatus = this.translate.instant(t.transactionStatus);
      });
      this.transactions = data;
    });
  }

  downloadPDF() {
    this.trans
      .downloadTransactionForCurrentUser(this.token.getUserid())
      .subscribe((data) => {
        this.message = this.translate.instant(data);
        this.addSingle();
      });
  }
}
