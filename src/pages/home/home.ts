import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public zipcode: number;
  public location: any;
  public locationLoaded: boolean = false;

  constructor(public navCtrl: NavController) {
    this.getCurrentLocation();
  }

  searchWeather(e: Event, zipcode: number) {
    console.log(e, zipcode, this.zipcode);
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition()
      .then((res) => {
        console.log(res);
        this.locationLoaded = true;
        this.location = res.coords;
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
