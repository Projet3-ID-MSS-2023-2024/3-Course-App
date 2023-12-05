import { Time } from "@angular/common";
import { Course } from "./course";
import { User } from "./user";

export class Resultat {
    id!: number;
    temps!: Time | null;
    abandon!: string | null;
    course!: Course;
    utilisateur!: User;
  }