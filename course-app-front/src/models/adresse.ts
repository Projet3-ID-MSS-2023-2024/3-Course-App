import { Ville } from "./ville";

export class Adresse {
  rue: string;
  latitude: number;
  longitude: number;
  ville: number;
    constructor() {
        this.rue = "";
        this.latitude=0;
        this.longitude=0;
        this.ville =0;
    }
}

export class AdresseList {
  rue!: string;
  latitude!: number;
  longitude!: number;
  ville!: Ville;
}
