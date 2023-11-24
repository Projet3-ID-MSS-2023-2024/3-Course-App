import { Time } from "@angular/common";

export class Course{
  titre: string;
  prix: number;
  date: Date;
  heure: Time;
  adresse: number;
  adresse1: number;

  constructor(){
    this.titre="";
    this.prix=0;
    this.date=new Date();
    this.heure={hours:0,minutes:0};
    this.adresse=0;
    this.adresse1=0;
  }

}
