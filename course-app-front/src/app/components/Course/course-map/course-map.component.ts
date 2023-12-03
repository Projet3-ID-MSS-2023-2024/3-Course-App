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
    let map = L.map('map').setView([50.499, 4.475], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let marker = L.marker([50.499, 4.475]).addTo(map);
    let marker2 = L.marker([50.494, 4.475]).addTo(map);

    const control = L.Routing.control({
      waypoints: [
        L.latLng([50.499, 4.475]),
        L.latLng([50.494, 4.475])
      ]
    });
    control.addTo(map)

    control.on('routeselected', function (e) {
      var instructionsContainer = document.querySelector('.leaflet-routing-container .leaflet-routing-alt');
      if (instructionsContainer) {
          instructionsContainer.innerHTML = ''; // Effacer le contenu des instructions
      }
    });

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  }

}
