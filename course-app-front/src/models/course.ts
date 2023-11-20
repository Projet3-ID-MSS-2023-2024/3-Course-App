export class Course{
  titre: string;
  prix: number;
  DateEtHeure: Date;
  Adresse: string;
  Adresse1: string;

  constructor(){
    this.titre="";
    this.prix=0;
    this.DateEtHeure=new Date();
    this.Adresse="";
    this.Adresse1="";
  }

}
