export class Course{
  titre: string;
  prix: number;
  DateEtHeure: Date;
  Adresse: number;
  Adresse1: number;

  constructor(){
    this.titre="";
    this.prix=0;
    this.DateEtHeure=new Date();
    this.Adresse=0;
    this.Adresse1=0;
  }

}
