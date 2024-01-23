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
    return this.http.post<TokenResponse>('https://localhost:8080/api/auth/authenticate', user);
  }

  register(user:User){
    return this.http.post('https://localhost:8080/api/auth/register', user, { responseType: 'text' });
  }

  addFirstAdmin(user:User){
    return this.http.post('https://localhost:8080/api/auth/firstAdmin', user, { responseType: 'text' });
  }

  confirmInscription(code:any){
    return this.http.get(`https://localhost:8080/api/auth?code=${code}`);
  }

  countUserDb(){
    return this.http.get("https://localhost:8080/api/auth/countUserDb");
  }

  getUserWithToken(token: string):Observable<User>{
    return this.http.post<User>('https://localhost:8080/api/auth', token);
  }

  // Fonction qui ajoute le token dans le LS
  authSuccess(token:any){
    localStorage.setItem('token',token)
  }

  // Fonction qui retire le token du LS
  logout(){
    localStorage.removeItem('token')
  }

  getToken(){
     return localStorage.getItem('token')
  }

  // Fonction qui permet de vérifier si un token est stocké en LocalStorage
  isUserLoggedIn() {
    let token = localStorage.getItem('token')
    if (token === null) return false
    return true
  }

  // Fonction qui renvoi le token qui se trouve dans le LS
  getLoggedInToken() {
    let token = localStorage.getItem('token')
    if (token === null) return ''
    return token
  }
}
