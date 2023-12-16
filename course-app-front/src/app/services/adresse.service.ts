import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Adresse } from 'src/models/adresse';
import { Ville } from 'src/models/ville';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  constructor(private http:HttpClient) { }

  addAdresse(Adresse: Adresse) {
    return this.http.post('http://localhost:8080/api/adresse', Adresse, { responseType: 'text' });
  }

  getAdressesBelges(query : string):Observable<any>{
    const params = new HttpParams()
    .set('q',query)
    .set('countrycodes', 'BE')
    .set('format', 'json')
    .set('limit', '5');

    return this.http.get('https://nominatim.openstreetmap.org/search',{params});
  }

  getLatLong(query : string):Observable<any>{
    const params = new HttpParams()
    .set('q',query)
    .set('countrycodes', 'BE')
    .set('format', 'json')
    .set('limit', '1');

    return this.http.get('https://nominatim.openstreetmap.org/search',{params});
  }

  getAddressFromCoordinates(lat: number, lon: number): Promise<Adresse> {
    return new Promise<Adresse>((resolve, reject) => {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

      this.http.get(apiUrl).subscribe((res: any) => {
        const adresse = new Adresse();
        const ville = new Ville();

        if (res.address.city_district) {
          ville.nom = res.address.city_district;
        } else if (res.address.village) {
          ville.nom = res.address.village;
        } else if (res.address.town) {
          ville.nom = res.address.town;
        } else {
          ville.nom = res.address.county;
        }

        ville.code_postale = +res.address.postcode;
        adresse.ville = ville;

        if (res.address.house_number) {
          adresse.rue = res.address.road + " " + res.address.house_number;
        } else {
          adresse.rue = res.address.road;
        }

        adresse.latitude = +lat;
        adresse.longitude = +lon;

        resolve(adresse);
      }, (error: any) => {
        reject(error);
      });
    });
  }

}
