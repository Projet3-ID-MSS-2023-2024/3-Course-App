import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { AdresseService } from 'src/app/services/adresse.service';
import { Adresse } from 'src/models/adresse';
import { Course } from 'src/models/course';
import { Ville } from 'src/models/ville';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-course-add',
  templateUrl: './update-course-add.component.html',
  styleUrls: ['./update-course-add.component.css'],
  providers: [MessageService]
})
export class UpdateCourseAddComponent implements OnInit{
  items: any[] | undefined;
  suggestions!: any[];
  addCourseForm!: FormGroup;
  course!:Course;
  adresseDepart !: Adresse;
  villeDepart !: Ville;
  adresseArr !: Adresse;
  villeArr !: Ville;
  dialogMap:boolean =false;
  map : any;
  isLoading:boolean =false;

  constructor(
    private router: Router,
    private adresseService : AdresseService,
    private fb : FormBuilder,
    private courseService: CourseService){}

  ngOnInit(): void {
    this.course = new Course();
    this.adresseDepart = new Adresse();
    this.villeDepart = new Ville();
    this.adresseArr = new Adresse();
    this.villeArr = new Ville();

    this.addCourseForm = this.fb.group({
      titre: ['', Validators.required],
      prix: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
      adresseDep: ['', Validators.required],
      adresseArr: ['', Validators.required]
    })
  }

  search(query : string) {
    this.adresseService.getAdressesBelges(query).subscribe(
      (res) => {
        this.suggestions = res.map((item: any) => item.display_name);
      })
  }

  displayMap(){
    this.dialogMap = true;

    this.adresseService.getLatLong(this.addCourseForm.value.adresseDep).subscribe((res)=>{
      const lati = res.map((item: any) => item.lat);
      const long = res.map((item:any)=> item.lon);
      this.adresseService.getLatLong(this.addCourseForm.value.adresseArr).subscribe((res)=>{
        const lat1 = res.map((item: any) => item.lat);
        const long1 = res.map((item:any)=> item.lon);

        this.loadMap(lati[0], long[0], lat1[0], long1[0]);
        })
      })

  }

  loadMap(lati:any, long:any, latArr: any, longArr: any){
    if (this.map) {
      this.map.off();
      this.map.remove();
    }

    this.map = L.map('map').setView([lati, long], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

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
    const bounds = L.latLngBounds([lati, long],[latArr, longArr]);
    this.map.fitBounds(bounds);

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

    let marker = L.marker([lati, long]).addTo(this.map).bindPopup("Départ").openPopup();
    let marker2 = L.marker([latArr, longArr]).addTo(this.map).bindPopup("Arrivé");
  }

  ajouter(){
    this.isLoading=true;
    this.adresseService.getLatLong(this.addCourseForm.value.adresseDep).subscribe((res)=>{
      const lat = res.map((item: any) => item.lat);
      const long = res.map((item:any)=> item.lon);

      this.adresseService.getAddressFromCoordinates(lat, long).subscribe((res)=>{
        if (res.address.city_district) {
          this.villeDepart.nom = res.address.city_district;
        } else if (res.address.village) {
          this.villeDepart.nom = res.address.village;
        } else if (res.address.town) {
          this.villeDepart.nom = res.address.town;
        } else {
          this.villeDepart.nom = res.address.county;
        }

        this.villeDepart.code_postale = +res.address.postcode;
        this.adresseDepart.ville = this.villeDepart;

        if (res.address.house_number) {
          this.adresseDepart.rue = res.address.road + " "+res.address.house_number;
        } else { this.adresseDepart.rue = res.address.road }

        this.adresseDepart.latitude =+lat;
        this.adresseDepart.longitude =+long;
        this.course.adresse = this.adresseDepart;

        this.adresseService.getLatLong(this.addCourseForm.value.adresseArr).subscribe((res)=>{
          const lat1 = res.map((item: any) => item.lat);
          const long1 = res.map((item:any)=> item.lon);

          this.adresseService.getAddressFromCoordinates(lat1,long1).subscribe((res)=>{
            if (res.address.city_district) {
              this.villeArr.nom = res.address.city_district;
            } else if (res.address.village) {
              this.villeArr.nom = res.address.village;
            } else if (res.address.town) {
              this.villeArr.nom = res.address.town;
            } else {
              this.villeArr.nom = res.address.county;
            }
            this.villeArr.code_postale = +res.address.postcode;
            this.adresseArr.ville = this.villeArr;

            if (res.address.house_number) {
              this.adresseArr.rue = res.address.road + " "+res.address.house_number;
            } else { this.adresseDepart.rue = res.address.road }

            this.adresseArr.latitude =+lat1;
            this.adresseArr.longitude =+long1;
            this.course.adresse1 = this.adresseArr;

            this.course.titre = this.addCourseForm.value.titre;
            this.course.prix = this.addCourseForm.value.prix;
            this.course.date = this.addCourseForm.value.date;
            this.course.heure = this.addCourseForm.value.heure;
            console.log(this.course)
            this.courseService.addCourse(this.course).subscribe((res)=>{
              this.isLoading=false;
              console.log(res)
              this.addCourseForm.reset();
              this.router.navigateByUrl('/courses/admin');
            })
          })
        })
      })
    })
  }
}
