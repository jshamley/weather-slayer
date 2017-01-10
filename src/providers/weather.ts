import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Weather {
  private wxapikey: string = 'b6582f1b71cd734c';

  constructor(
    public http: Http
  ) {
    console.log('Hello Weather Provider');
  }

  getCurrentConditions(postalCode) {
    return this.http.get('https://api.wunderground.com/api/' + this.wxapikey + '/conditions/q/' + postalCode + '.json')
      .map(res => res)
      .catch(this.handleError);
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
