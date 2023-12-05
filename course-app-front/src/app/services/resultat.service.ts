import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
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

  getResultatsByUserId(id: number): Observable<Resultat[]>{
    return this.http.get<Resultat[]>(`${this.resultatApiUrl}/${id}`).pipe(
      tap((Resultats: Resultat[]) => this.log(Resultats)),
      catchError((error: Error) => this.handleError(error, undefined))
    );
  }

  private log(response: Resultat | Resultat[] | boolean | undefined): void {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
