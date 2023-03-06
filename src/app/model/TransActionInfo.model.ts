export class TransActionInfo {
  accountReciever: string;
  accountSender: string;
  amount: number;
  transactionStatus: string;
  description: string;

  constructor(
    accountReciever: string,
    accountsender: string,
    amount: number,
    transactionStatus: string,
    description: string
  ) {
    this.accountReciever = accountReciever;
    this.accountSender = accountsender;
    this.amount = amount;
    this.description = description;
    this.transactionStatus = transactionStatus;
  }
}
