import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  addCourse(course:Course) {
    return this.http.post('http://localhost:8080/api/course', course, { responseType: 'text' });
  }
}
