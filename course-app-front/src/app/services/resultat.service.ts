import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resultat } from 'src/models/resultat';

@Injectable({
  providedIn: 'root'
})
export class ResultatService {
  private resultatApiUrl = 'http://localhost:8080/api/resultat';

  constructor(private http: HttpClient) { }

  add(resultat: Resultat) {
    return this.http.post(this.resultatApiUrl, resultat, { responseType: 'text' });
  }
}
