import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TokenResponse } from 'src/models/tokenResponse';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  authentication(user:User){
    return this.http.post<TokenResponse>('http://localhost:8080/api/auth/authenticate', user);
  }

  register(user:User){
    return this.http.post('http://localhost:8080/api/auth/register', user, { responseType: 'text' });
  }

  addFirstAdmin(user:User){
    return this.http.post('http://localhost:8080/api/auth/firstAdmin', user, { responseType: 'text' });
  }

  confirmInscription(code:any){
    return this.http.get(`http://localhost:8080/api/auth?code=${code}`);
  }

  getUserWithToken(token: string):Observable<User>{
    return this.http.post<User>('http://localhost:8080/api/auth', token);
  }

  authSuccess(token:any){
    localStorage.setItem('token',token)
  }

  logout(){
    localStorage.removeItem('token')
  }

  getToken(){
     return localStorage.getItem('token')
  }

  getLoggedInToken() {
    let user = localStorage.getItem('token')
    if (user === null) return ''
    return user
  }

  isUserLoggedIn() {
    let token = localStorage.getItem('token')
    if (token === null) return false
    return true
  }
}
