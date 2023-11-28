import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course} from 'src/models/course';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-courses-list-admin',
  templateUrl: './courses-list-admin.component.html',
  styleUrls: ['./courses-list-admin.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CoursesListAdminComponent implements OnInit{
  courses!: Course[];
  visible: boolean = false;
  courseForm!:FormGroup;
  // items!: MenuItem[];
  loading: boolean = true;
  course!:Course;

  constructor(private courseService: CourseService, private confirmationService: ConfirmationService, private messageService: MessageService, private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses: Course[]) => {
      this.courses = courses;
      this.loading = false;
    });
    this.course = new Course();
    this.courseForm = this.fb.group({
      titre:['', Validators.required],
      prix:['', Validators.required],
      date: ['',Validators.required],
      heure: ['',Validators.required],
      adresse: ['', Validators.required],
      adresse1: ['',Validators.required],
    })
    // this.items = [
    //   {
    //       icon: 'pi pi-fw pi-pencil',
    //       routerLink: ''
    //   },
    //   {
    //     icon: 'pi pi-fw pi-trash',
    //     onclick: 'deleteCourse(this.course)'
    //   },
    // ]
  }

   clear(table: Table) {
       table.clear();
   }
   /*** Suppression d'une course***/
   deleteCourse(course: Course): void {
    this.confirmationService.confirm({
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
          console.log(course);
          this.courseService.deleteCourse(course.id)
            .subscribe({
              next: (res) => {
                console.log(course);
                console.log(res);
              },
              error: (e) => console.error(e)
            });
      },
      reject: (type: ConfirmEventType) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
          }
      }
  });
  }

    showDialog() {
        this.visible = true;
    }
    hideDialog() {
      this.visible = false;
    }
  modifCourse(): void{
    this.confirmationService.confirm({
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
          this.course.titre = this.courseForm.value.titre;
          this.course.prix = this.courseForm.value.prix;
          this.course.date = this.courseForm.value.date;
          this.course.heure = this.courseForm.value.heure;
          this.course.adresse = this.courseForm.value.adresse;
          this.course.adresse1 = this.courseForm.value.adresse1;
          this.courseService.modifCourse(this.course).subscribe({
            next: (res) => {
              this.hideDialog();
              this.router.navigateByUrl('/courses/admin');
              console.log(res);
            },
            error: (e) => console.error(e)
          });
      },
      reject: (type: ConfirmEventType) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  this.router.navigateByUrl('/courses/admin');
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  this.router.navigateByUrl('/courses/admin');
                  break;
          }
      }
    });
  }
}

