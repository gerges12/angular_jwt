import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

let headers: HttpHeaders = new HttpHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private makeTransactionEndPoint =
    'http://localhost:8080/MIS/transaction/maketransaction';
  private pendingtransactionEndPoint =
    'http://localhost:8080/MIS/transaction/getpendingtransaction';
  private acceptToTransactionEndPoint =
    'http://localhost:8080/MIS/transaction/Accepttotransaction';
  private rejectToTransactionEndPoint =
    'http://localhost:8080/MIS/transaction/Rejecttotransaction';

  private repliedtransactionEndPoint =
    'http://localhost:8080/MIS/transaction/getrepliedtransaction/';
  private deletetransactionEndPoint =
    'http://localhost:8080/MIS/transaction/deletetransaction/';
  private updateransactionEndPoint =
    'http://localhost:8080/MIS/transaction/updatetransaction/';

  private downloadtransactionEndPoint =
    'http://localhost:8080/MIS/transaction/downlowdPdf/';
  constructor(private http: HttpClient) {}

  pendingTransaction() {
    return this.http.get<any>(this.pendingtransactionEndPoint, httpOptions);
  }

  replayedTransaction(userId: number) {
    return this.http.get<any>(
      this.repliedtransactionEndPoint + userId,
      httpOptions
    );
  }

  downloadTransactionForCurrentUser(userId: number) {
    return this.http.get(this.downloadtransactionEndPoint + userId, {
      responseType: 'text',
    });
  }

  makeTransaction(transActionInfo: any): Observable<any> {
    return this.http.post(
      this.makeTransactionEndPoint,
      transActionInfo,
      httpOptions
    );
  }

  acceptToTransaction(transactionId: number): Observable<any> {
    return this.http.post(
      this.acceptToTransactionEndPoint,
      transactionId,
      httpOptions
    );
  }

  rejectToTransaction(transactionId: number): Observable<any> {
    return this.http.post(this.rejectToTransactionEndPoint, transactionId, {
      responseType: 'text',
    });
  }

  deleteTransaction(transactionId: number) {
    return this.http.delete(this.deletetransactionEndPoint + transactionId, {
      responseType: 'text',
    });
  }

  updateTransaction(transaction: any): Observable<any> {
    return this.http.put(
      this.updateransactionEndPoint,
      transaction,
      httpOptions
    );
  }
}
