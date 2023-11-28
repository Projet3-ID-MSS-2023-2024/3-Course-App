import { Time } from "@angular/common";
import { AdresseList } from "./adresse";

export class Course{
  id: number;
  titre: string;
  prix: number;
  date: Date;
  heure: Time;
  adresse: number;
  adresse1: number;

  constructor(){
    this.id= 0;
    this.titre="";
    this.prix=0;
    this.date=new Date();
    this.heure={hours:0,minutes:0};
    this.adresse=0;
    this.adresse1=0;
  }

}

export class CourseList {
  id!: number;
  titre!: string;
  prix!: number;
  date!: Date;
  heure!: Time;
  adresse!: AdresseList;
  adresse1!: AdresseList;
}
