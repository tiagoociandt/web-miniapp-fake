import { Component, OnInit } from '@angular/core';
import { CieloPay } from '../gateway/cielo-pay';
import { Router } from '@angular/router';
import { LocationModel } from '../model/location-model';
import { LocationErrorModel } from '../model/location-error-model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  location: LocationModel;
  message: string;
  markers = [];
  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  constructor(private router: Router,
              private cieloPay: CieloPay) {
                this.cieloPay.gateway.onLocationSuccess = (result: string) => this.onLocationSuccess(result);
                this.cieloPay.gateway.onLocationError = (result: string) => this.onLocationError(result);
  }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/miniapps']);
  }

  requestLocation() {
    try {
      this.cieloPay.gateway.askLocation();
    } catch (err) {
      console.log(err);
    }
  }

  onLocationSuccess(result: string) {
    try {
      if (result) {
        this.location = JSON.parse(result);
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: +this.location.lat,
            lng: +this.location.long,
          };
          this.markers.push({
            position: {
              lat: +this.location.lat,
              long: +this.location.long
            },
            label: {
              color: 'red',
              text: `Você está aqui ${this.markers.length + 1}`
            },
            title: `Mark ${this.markers.length + 1}`,
            options: {
              animation: google.maps.Animation.BOUNCE,
            }
          });
        });
      } else {
        this.message = 'Houve um erro!';
      }
    } catch (err) {
      this.message = 'Houve um erro!';
      console.log(err);
    }
  }

  onLocationError(result: string) {
    console.log(result);
    try {
      if (result) {
        const locationError: LocationErrorModel = JSON.parse(result);
        this.message = locationError.message;
      } else {
        this.message = 'Houve um erro!';
      }
    } catch (err) {
      this.message = 'Houve um erro!';
      console.log(err);
    }
  }
}
