import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8080/api/users');
  }

  getDel(): Observable<User[]>{
    return this.http.get<User[]>(`http://localhost:8080/api/users/del`);
  }

  add(user : User){
    return this.http.post('http://localhost:8080/api/users', user, { responseType: 'text' });
  }

  delUser(id : Number){
    return this.http.delete(`http://localhost:8080/api/users/${id}`);
  }
}
