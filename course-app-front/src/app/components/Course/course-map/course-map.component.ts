import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-course-map',
  templateUrl: './course-map.component.html',
  styleUrls: ['./course-map.component.css']
})
export class CourseMapComponent implements OnInit{
  ngOnInit(): void {
    let map = L.map('map').setView([50.419584, 4.573305], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const control = L.Routing.control({
      waypoints: [
        L.latLng([50.419584, 4.573305]),
        L.latLng([50.421769, 4.528363]),
        L.latLng([50.411496, 4.505646])
      ],
      routeWhileDragging: false,
      showAlternatives: false
    });
    control.addTo(map)
    const bounds = L.latLngBounds([50.419584, 4.573305],[50.411496, 4.505646]);
    map.fitBounds(bounds);

    control.on('routeselected', function(e) {
      var waypoints = document.querySelectorAll('.leaflet-marker-draggable');
      waypoints.forEach(function(waypoint) {
        // Explicitly cast to HTMLElement to access the style property
        (waypoint as HTMLElement).style.display = 'none';
      });
    });

    control.on('routeselected', function(e) {
      var waypoints = document.querySelectorAll('.leaflet-pane .leaflet-shadow-pane');
      waypoints.forEach(function(waypoint) {
        // Explicitly cast to HTMLElement to access the style property
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

    let marker = L.marker([50.419584, 4.573305]).addTo(map).bindPopup("Départ").openPopup();
    let marker2 = L.marker([50.411496, 4.505646]).addTo(map).bindPopup("Arrivé");
  }

}
