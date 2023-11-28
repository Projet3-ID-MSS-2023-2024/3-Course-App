import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ville } from 'src/models/ville';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  constructor(private http: HttpClient) { }

  addVille(Ville:Ville) {
    return this.http.post('http://localhost:8080/api/ville', Ville, { responseType: 'text' });
  }
}
