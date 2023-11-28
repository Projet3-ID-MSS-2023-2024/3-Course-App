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

  get(str : string): Observable<User[]>{
    return this.http.get<User[]>(`http://localhost:8080/api/users/${str}`);
  }

  add(user : User){
    return this.http.post('http://localhost:8080/api/users', user, { responseType: 'text' });
  }
}
