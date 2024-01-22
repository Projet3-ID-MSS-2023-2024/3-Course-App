import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map : any;

  constructor() { }

  loadMap(lati:any, long:any, latArr: any, longArr: any){
    if (this.map) {
      this.map.off();
      this.map.remove();
    }

    // Initialisation de la map
    this.map = L.map('map').setView([lati, long], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // Ajout de l'itinéraire
    const control = L.Routing.control({
      waypoints: [
        L.latLng([lati,long]),
        L.latLng([latArr, longArr])
      ],
      addWaypoints: false,
      routeWhileDragging: false,
      showAlternatives: false
    });
    control.addTo(this.map)

    // On centre le carte sur l'itinéraire
    const bounds = L.latLngBounds([lati, long],[latArr, longArr]);
    this.map.fitBounds(bounds);

    // On Supprime les containers d'information inutile sur la carte comme les instructions de l'itinéraire
    control.on('routeselected', function(e) {
      var waypoints = document.querySelectorAll('.leaflet-pane .leaflet-shadow-pane');
      waypoints.forEach(function(waypoint) {
        (waypoint as HTMLElement).style.display = 'none';
      });
    });
    control.on('routeselected', function (e) {
      var instructionsContainer = document.querySelector('.leaflet-routing-container .leaflet-routing-alt ') as HTMLElement;
      if (instructionsContainer) {
        instructionsContainer.style.display = 'none';
      }
    });
    control.on('routeselected', function (e) {
      var instructionsContainer = document.querySelector('.leaflet-routing-alternatives-container') as HTMLElement;
      if (instructionsContainer) {
        instructionsContainer.style.display = 'none';
      }
    });

    // Ajout d'un marqueur + pop-up pour le point de départ et d'arrivée
    let marker = L.marker([lati, long]).addTo(this.map).bindPopup("Départ").openPopup();
    let marker2 = L.marker([latArr, longArr]).addTo(this.map).bindPopup("Arrivée");
  }
}
