import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private ProfileInformation =
    'http://localhost:8080/MIS/profile/getProfileInformation/';

  constructor(private http: HttpClient) {}

  getProfileInformation(userId: number) {
    return this.http.get<any>(this.ProfileInformation + userId, httpOptions);
  }
}
