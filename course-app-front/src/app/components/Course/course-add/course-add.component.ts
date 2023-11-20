import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit{
  registerForm!:FormGroup;
  course!:Course;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private courseService: CourseService,
    private messageService: MessageService) { }

    ngOnInit(): void {
      this.course = new Course();
      this.registerForm = this.fb.group({
        titre:['', Validators.required],
        prix:['', Validators.required],
        DateEtHeure: ['', [Validators.required, Validators.email]],
        Adresse: ['', Validators.required],
        Adresse1: ['',Validators.required]
      })
    }
    add-Course(){
      this.course.titre = this.registerForm.value.titre;
      this.course.prix = this.registerForm.value.prix;
      this.course.DateEtHeure = this.registerForm.value.DateEtHeure;
      this.course.Adresse = this.registerForm.value.Adresse;
      this.course.Adresse1 = this.registerForm.value.Adresse1;
      this.courseService.addCourse(this.course).subscribe(()=>{
        this.router.navigateByUrl('/course');
      },(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur' });
    }

}
