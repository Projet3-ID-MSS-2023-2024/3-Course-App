import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultatService {
  private resultatApiUrl = 'http://localhost:8080/api/resultat';

  constructor(private http: HttpClient) { }

  addResultat(resultat: Resultat) {
    return this.http.post(this.resultatApiUrl, resultat, { responseType: 'text' });
  }
}
