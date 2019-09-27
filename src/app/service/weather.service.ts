import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  BASE_URL = environment.API_BASE_URL;
  BASE_URL2 = environment.API_BASE_URL2;

  APP_ID = environment.APP_ID;
  APP_ID2 = environment.APP_ID_2;

  constructor(private http: HttpClient) { }

  getForeCastData(param: string) {
    return this.http.get(this.BASE_URL + `/forecast?q=${param}&appid=${this.APP_ID}`);
  }

  getMoreDetails(param: string){
    return this.http.get(this.BASE_URL2 + `/history/city?q=${param}&appid=${this.APP_ID2}`);
  }
}
