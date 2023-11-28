export class User {

  nom: string;
  prenom:string;
  email: string;
  mdp: string;
  role: String[];

  constructor() {
    this.nom ="";
    this.prenom="";
    this.email = "";
    this.mdp = "";
    this.role = [];
  }

}
