import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adresse } from 'src/models/adresse';

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

  getAddressFromCoordinates(lat: number, lon: number): Observable<any> {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    return this.http.get(apiUrl);
  }
}
