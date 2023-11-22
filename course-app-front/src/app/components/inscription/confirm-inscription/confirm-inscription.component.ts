import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-inscription',
  templateUrl: './confirm-inscription.component.html',
  styleUrls: ['./confirm-inscription.component.css']
})
export class ConfirmInscriptionComponent implements OnInit{

  validation!:boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    this.authService.confirmInscription(code).subscribe((res)=>{
      if (res===true) {
        this.validation=true;
      } else {this.validation=false}
    },(error)=>{
      console.log(error)
    })
  }

}
