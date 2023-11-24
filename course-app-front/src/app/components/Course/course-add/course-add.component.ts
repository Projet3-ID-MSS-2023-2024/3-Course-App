import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/models/course';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css'],
  providers: [MessageService]
})
export class CourseAddComponent implements OnInit{
  courseForm!:FormGroup;
  course!:Course;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private courseService: CourseService,
    private messageService: MessageService) { }

    ngOnInit(): void {
      this.course = new Course();
      this.courseForm = this.fb.group({
        titre:['', Validators.required],
        prix:['', Validators.required],
        date: ['',Validators.required],
        heure: ['',Validators.required],
        adresse: ['', Validators.required],
        adresse1: ['',Validators.required],
      })
    }
    addCourse(){
      this.course.titre = this.courseForm.value.titre;
      this.course.prix = this.courseForm.value.prix;
      this.course.date = this.courseForm.value.date;
      this.course.heure = this.courseForm.value.heure;
      this.course.adresse = this.courseForm.value.adresse;
      this.course.adresse1 = this.courseForm.value.adresse1;
      this.courseService.addCourse(this.course).subscribe(()=>{
        this.router.navigateByUrl('/course-add');
      },(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
      })
    }
}
