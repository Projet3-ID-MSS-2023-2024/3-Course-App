import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Course } from 'src/models/course';
import { CourseList } from 'src/models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseApiUrl = 'http://localhost:8080/api/course';

  constructor(private http: HttpClient) { }

  addCourse(course:Course) {
    return this.http.post(this.courseApiUrl, course, { responseType: 'text' });
  }

  getCourses(): Observable<CourseList[]> {
    return this.http.get<CourseList[]>(`${this.courseApiUrl}`).pipe(
      tap((courses: CourseList[]) => this.log(courses)),
      catchError((error: Error) => this.handleError(error, undefined))
    );
  }

  private log(response: CourseList | CourseList[] | boolean | undefined): void {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
