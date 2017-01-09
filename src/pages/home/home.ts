import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public postalCode: number;
  public location: any;
  public locationLoaded: boolean = false;
  public loaded: boolean = false;
  private loader: any

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {
    this.createLoader();
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  searchWeather() {
    console.log(this.postalCode);
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

  isValid() {
    if (this.postalCode && this.postalCode.toString().length === 5) {
      return true;
    }
    return false;
  }

  createLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

}
