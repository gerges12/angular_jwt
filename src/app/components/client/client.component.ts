import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { TransActionInfo } from 'src/app/model/TransActionInfo.model';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  display: boolean = false;
  transactionDialog: boolean = false;
  detectedtransaction: any;

  disableToEdit: boolean = true;

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
    private translate: TranslateService,
    private confirmationService: ConfirmationService
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

  hideDialog() {
    this.transactionDialog = false;
    this.disableToEdit = true;
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

  saveTransaction() {
    this.trans.updateTransaction(this.detectedtransaction).subscribe(
      (data) => {
        this.message = this.translate.instant(data.message);
        this.transactionDialog = false;
        this.disableToEdit = true;
        this.addSingle();
        this.loadDataTable();
      },
      (error) => {
        console.log('hgg', error.error.message);
        this.message = this.translate.instant(error.error.message);
        this.adderrorMessage();
      }
    );
  }

  editTransaction(transaction: any) {
    if (
      transaction.transactionStatus == 'PENDING' ||
      transaction.transactionStatus == 'معلق'
    ) {
      this.disableToEdit = false;
    }

    this.detectedtransaction = transaction;
    this.transactionDialog = true;
  }

  deleteTransaction(transaction: any) {
    this.confirmationService.confirm({
      message: this.translate.instant('confirmMessage_for_Delete'),
      header: this.translate.instant('confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trans.deleteTransaction(transaction.id).subscribe((data) => {
          this.message = this.translate.instant(data);
          this.addSingle();
          this.loadDataTable();
        });
      },
    });
  }

  loadDataTable() {
    this.trans.replayedTransaction(this.token.getUserid()).subscribe((data) => {
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
