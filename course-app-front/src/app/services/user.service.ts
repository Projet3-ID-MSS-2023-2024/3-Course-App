import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  addFirstAdmin(user:User){
    return this.http.post('http://localhost:8080/api/users/firstAdmin', user, { responseType: 'text' });
  }
}
