import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adresse } from 'src/models/adresse';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  constructor(private http:HttpClient) { }

  addAdresse(Adresse: Adresse) {
    return this.http.post('http://localhost:8080/api/adresse', Adresse, { responseType: 'text' });
  }
}
