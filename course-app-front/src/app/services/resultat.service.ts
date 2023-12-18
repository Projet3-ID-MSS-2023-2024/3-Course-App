import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Course } from 'src/models/course';
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

  getCoursesByGestionnaireAndNotEnded(id: number): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.resultatApiUrl}/admin/${id}`).pipe(
      tap((courses: Course[]) => this.log(courses)),
      catchError((error: Error) => this.handleError(error, undefined))
    );
  }

  getCoursesByGestionnaireAndEnded(id: number): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.resultatApiUrl}/admin/terminees/${id}`).pipe(
      tap((courses: Course[]) => this.log(courses)),
      catchError((error: Error) => this.handleError(error, undefined))
    );
  }

  getResultatsByCourse(id: number):Observable<Resultat[]>{
    return this.http.get<Resultat[]>(`${this.resultatApiUrl}/admin/resultats/${id}`).pipe(
      tap((resultats: Resultat[]) => this.log(resultats)),
      catchError((error: Error) => this.handleError(error, undefined))
    );
  }
  private log(response: Resultat | Resultat[] | boolean | undefined | Course[]): void {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
