import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Course } from 'src/models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseApiUrl = 'http://localhost:8080/api/course';

  constructor(private http: HttpClient) { }

  addCourse(course:Course) {
    return this.http.post(this.courseApiUrl, course, { responseType: 'text' });
  }

  // Fonction de récupération des courses disponibles en contactant le backend
  getAvailableCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseApiUrl}`).pipe(
      tap((courses: Course[]) => this.log(courses)),
      catchError((error: Error) => this.handleError(error, undefined))
    );
  }

  getCoursesByGestionnaireAndNotDeleted(id: number): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.courseApiUrl}/admin/${id}`).pipe(
      tap((courses: Course[]) => this.log(courses)),
      catchError((error: Error) => this.handleError(error, undefined))
    );
  }

  getCoursesByGestionnaireAndDeleted(id: number): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.courseApiUrl}/admin/supprimees/${id}`).pipe(
      tap((courses: Course[]) => this.log(courses)),
      catchError((error: Error) => this.handleError(error, undefined))
    );
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get<Course[]>(`${this.courseApiUrl}/admin/course/${id}`).pipe(
      tap((courses: Course[]) => this.log(courses)),
      catchError((error: Error) => this.handleError(error, undefined))
    );
  }

  modifCourse(course: Course): Observable<any> {
    return this.http.put(`${this.courseApiUrl}/admin/${course.id}`, course);
  }

  deleteCourse(id: number): Observable<any>{
    return this.http.delete(`${this.courseApiUrl}/admin/${id}`);
  }

  private log(response: Course | Course[] | boolean | undefined): void {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
