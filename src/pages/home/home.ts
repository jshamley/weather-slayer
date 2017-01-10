import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Weather } from '../../providers/weather';

import 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public postalCode: number;
  public location: any;
  public locationLoaded: boolean = false;
  public loaded: boolean = false;
  public currentConditions: Object;
  private loader: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private wx: Weather
  ) {
    this.createLoader();
  }

  ngOnInit() {
    // this.getCurrentLocation();
    this.loaded = true;
    this.loader.dismiss();
  }

  searchWeather() {
    this.wx.getCurrentConditions(this.postalCode).subscribe(res => {
      console.log(res.json());
      const response = res.json();
      this.currentConditions = response;
    });

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

  convertKelvin(k) {
    const f = 1.8 * (k - 273) + 32;
    return Math.round(f * 10) / 10;
  }

}
