import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const httpOptions2 = {
  headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }),
};

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
  constructor(private http: HttpClient) {}

  pendingTransaction() {
    return this.http.get<any>(this.pendingtransactionEndPoint, httpOptions);
  }

  makeTransaction(transActionInfo: any): Observable<any> {
    return this.http.post<any>(
      this.makeTransactionEndPoint,
      transActionInfo,
      httpOptions2
    );
  }

  acceptToTransaction(transactionId: number): Observable<any> {
    return this.http.post<any>(
      this.acceptToTransactionEndPoint,
      transactionId,
      httpOptions
    );
  }

  rejectToTransaction(transactionId: number): Observable<any> {
    return this.http.post<any>(
      this.rejectToTransactionEndPoint,
      transactionId,
      httpOptions
    );
  }
}
