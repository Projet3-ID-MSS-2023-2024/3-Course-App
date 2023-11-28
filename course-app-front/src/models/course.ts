import { Time } from "@angular/common";
import { Adresse } from "./adresse";

export class Course {
  titre!: string;
  prix!: number;
  date!: Date;
  heure!: Time;
  adresse!: Adresse;
  adresse1!: Adresse;
}
