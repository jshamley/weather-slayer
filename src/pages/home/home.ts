import { Component, OnInit } from '@angular/core';
import { Http, Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

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
  private wxapikey: string = 'b6582f1b71cd734c';

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private jsonp: Jsonp,
    private http: Http
  ) {
    this.createLoader();
  }

  ngOnInit() {
    // this.getCurrentLocation();
    this.loaded = true;
    this.loader.dismiss();
  }

  searchWeather() {
    console.log(this.postalCode);
    this.getCurrentConditions().subscribe(res => {
      const response = res.json();
      this.currentConditions = response.current_observation;
      console.log(res.json());
    });
  }

  getCurrentConditions() {
    return this.http.get('https://api.wunderground.com/api/' + this.wxapikey + '/conditions/q/' + this.postalCode + '.json')
      .map(res => res)
      .catch(this.handleError);
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

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
