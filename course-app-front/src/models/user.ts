export class User {
  id: number;
  nom: string;
  prenom:string;
  email: string;
  mdp: string;
  role: String[];
  temp: boolean;

  constructor() {
    this.id = 0;
    this.nom ="";
    this.prenom="";
    this.email = "";
    this.mdp = "";
    this.role = [];
    this.temp = false;
  }

}
