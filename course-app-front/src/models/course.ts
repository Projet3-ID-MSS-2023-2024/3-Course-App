import { Time } from "@angular/common";
import { Adresse } from "./adresse";
import { User } from "./user";

export class Course {
  id!: number;
  titre!: string;
  prix!: number;
  date!: Date;
  heure!: Time;
  adresse!: Adresse;
  adresse1!: Adresse;
  utilisateur!: User;
}
