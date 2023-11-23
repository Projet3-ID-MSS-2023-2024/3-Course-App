import { Time } from "@angular/common";

export class Course{
  titre: string;
  prix: number;
  date: Date;
  heure: Time;
  Adresse: number;
  Adresse1: number;

  constructor(){
    this.titre="";
    this.prix=0;
    this.date=new Date();
    this.heure={hours:0,minutes:0};
    this.Adresse=0;
    this.Adresse1=0;
  }

}
