import { Injectable } from '@angular/core';
import { Http, Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Weather {
  private wxapikey: string = '7aee6ab54b2751d5ead346b6a4772565';

  constructor(
    private http: Http,
    private jsonp: Jsonp
  ) {

  }

  getCurrentConditions(postalCode: number) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?zip=${postalCode},us&appid=${this.wxapikey}`)
      .map(res => res)
      .catch(this.handleError);
  }

  getForecast(postalCode: number) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?zip=${postalCode},us&appid=${this.wxapikey}`)
      .map(res => res)
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
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
