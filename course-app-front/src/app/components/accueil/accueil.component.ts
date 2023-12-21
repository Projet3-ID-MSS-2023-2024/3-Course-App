import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit{
  log!:boolean;
  constructor(
    private authService :AuthService,
    private route: Router){}

  ngOnInit(): void {
    if(this.authService.isUserLoggedIn()){
      this.log=true;
    } else {this.log=false;}
  }

  inscription(){
    this.route.navigateByUrl('/inscription')
  }
}

