import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Course } from 'src/models/course';
@Injectable({
  providedIn: 'root'
})
export class ResultatsService {
  private resultatsApiUrl = 'http://localhost:8080/api/resultats';

  constructor(private http: HttpClient){}

  getCoursesByGestionnaireAndNotEnded(id: number): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.resultatsApiUrl}/admin/${id}`).pipe(
      tap((courses: Course[]) => this.log(courses)),
      catchError((error: Error) => this.handleError(error, undefined))
    );
  }

  private log(response: Course | Course[] | boolean | undefined): void {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
