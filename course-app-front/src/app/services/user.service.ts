import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';
import { ChangePassword } from 'src/models/changePassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>('https://localhost:8080/api/users');
  }

  getDel(): Observable<User[]>{
    return this.http.get<User[]>(`https://localhost:8080/api/users/del`);
  }

  add(user : User){
    return this.http.post('https://localhost:8080/api/users', user, { responseType: 'text' });
  }

  delUser(id : Number){
    return this.http.delete(`https://localhost:8080/api/users/${id}`);
  }

  activeUser(id: number){
    return this.http.post('https://localhost:8080/api/users/active',id);
  }

  newMdpTemp(id : number){
    return this.http.post('https://localhost:8080/api/users/generate/mdpTemp',id);
  }

  addMdp(mdp: string){
    return this.http.post('https://localhost:8080/api/users/addMdp', mdp);
  }
  updateUserName(id: number, user: User){
    return this.http.put(`https://localhost:8080/api/users/name/${id}`,user );
  }

  updateUserPrenom(id: number, user: User){
    return this.http.put(`https://localhost:8080/api/users/prenom/${id}`,user );
  }

  changeRole(id: number, user: User){
    return this.http.put(`https://localhost:8080/api/users/role/${id}`,user );
  }

  updateUserMail(id: number, user: User){
    return this.http.put(`https://localhost:8080/api/users/mail/${id}`,user );
  }

  updateUserPassword(id: number, changePassword: ChangePassword){
    return this.http.put(`https://localhost:8080/api/users/changePassword/${id}`,changePassword );
  }
}
