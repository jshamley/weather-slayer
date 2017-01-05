import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public zipcode: number;

  constructor(public navCtrl: NavController) {
    this.getCurrentLocation();
  }

  searchWeather(e: Event, zipcode: number) {
    console.log(e, zipcode, this.zipcode);
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition()
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
