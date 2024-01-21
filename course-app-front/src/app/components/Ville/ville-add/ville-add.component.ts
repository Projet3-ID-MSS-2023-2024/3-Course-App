import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VilleService } from 'src/app/services/ville.service';
import { Ville } from 'src/models/ville';

@Component({
  selector: 'app-ville-add',
  templateUrl: './ville-add.component.html',
  styleUrls: ['./ville-add.component.css'],
})
export class VilleAddComponent implements OnInit{
  villeForm!:FormGroup;
  ville!:Ville;

    constructor(
      private router: Router,
      private fb: FormBuilder,
      private villeService: VilleService,
      private messageService: MessageService
    ) { }
  ngOnInit(): void {
    this.ville = new Ville();
    this.villeForm = this.fb.group({
      nom:['',Validators.required],
      code_postale:['',Validators.required]
    })
  }
  addVille(){
    this.ville.nom = this.villeForm.value.nom;
    this.ville.code_postale = this.villeForm.value.code_postale;
    this.villeService.addVille(this.ville).subscribe(()=>{
      this.router.navigateByUrl('/ville-add');
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'erreur back' });
    })
  }


}
