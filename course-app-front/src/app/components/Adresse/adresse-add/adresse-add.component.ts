import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdresseService } from 'src/app/services/adresse.service';
import { Adresse } from 'src/models/adresse';

@Component({
  selector: 'app-adresse-add',
  templateUrl: './adresse-add.component.html',
  styleUrls: ['./adresse-add.component.css'],
})
export class AdresseAddComponent {
  adresseForm!:FormGroup;
  adresse!:Adresse;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private adresseService: AdresseService,
    private messageService: MessageService) { }

    ngOnInit(): void {
      this.adresse = new Adresse();
      this.adresseForm = this.fb.group({
        rue:['', Validators.required],
        latitude:['', Validators.required],
        longitude: ['',Validators.required],
         ville: ['',Validators.required],
      })
    }
    addAdresse(){
      this.adresse.rue = this.adresseForm.value.rue;
      this.adresse.latitude = this.adresseForm.value.latitude;
      this.adresse.longitude = this.adresseForm.value.longitude;
      this.adresse.ville = this.adresseForm.value.ville;
      this.adresseService.addAdresse(this.adresse).subscribe(()=>{
        this.router.navigateByUrl('/adresse-add');
      },(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
      })
    }

}
