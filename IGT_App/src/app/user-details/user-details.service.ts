import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  baseURL: string = 'https://gorest.co.in/public-api/';
  userListFromService!: [userModel];

  paginationDetails: any = {
    length: 10,
    pageSize: 10,
    pageIndex: 0,
    total: 0,
    limit: 0
  };

  constructor(private _httpClient: HttpClient) { }

  getUserDetails() {
    return this._httpClient.get(this.baseURL + 'users?page=' + this.paginationDetails.pageIndex + '&per_page=' + this.paginationDetails.pageSize);
  }

}
