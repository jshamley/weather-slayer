import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public zipcode: number;
  public location: any;
  public locationLoaded: boolean = false;
  public loaded: boolean = false;
  private loader: any

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

    this.getCurrentLocation();
  }

  searchWeather() {
    console.log(this.zipcode);
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition()
      .then((res) => {
        this.locationLoaded = true;
        this.loaded = true;
        this.location = res.coords;
        this.loader.dismiss();
      })
      .catch((err) => {
        this.loaded = true;
        this.loader.dismiss();
        console.log(err);
      });
  }

}
