import { Time } from "@angular/common";
import { Course } from "./course";
import { User } from "./user";

export class Resultat {
  id!: number;
  temps!: Time;
  abandon!: String;
  course!: Course;
  utilisateur!: User;
}
