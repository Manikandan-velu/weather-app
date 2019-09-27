import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog} from '@angular/material';
import { WeatherService } from '../service/weather.service';
import { LoaderService } from '../service/loader.service';
import { ForeCast, City, Main } from '../model/model';
import { ForecastModalComponent } from '../shared/forecast-modal/forecast-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  
  citySearchQueryString: null;
  citySearchQuery = new Subject<string>();
  public infoMsg: string;
  public foreCastData: ForeCast;
  public cityData: City;
  public forCastDetails: ForeCast;

  constructor( 
    private weatherService: WeatherService,
    public dialog: MatDialog,
    private loaderService: LoaderService,
    ) { 
    this.searchFilters();
  }

  ngOnInit() {
    this.infoMsg = `Please search city to check today's weather!`;
  }

  getForeCast(param) {
    //enable custom loader for api call
    this.loaderService.isLoading.next(true);
    this.weatherService.getForeCastData(param).subscribe(
      res => {
        this.foreCastData = res['list'];
        this.cityData = res['city'];
      },
      err => {
        this.foreCastData = null;
        this.infoMsg = `Please enter valid city name!`;
      }
    ).add(() => {
      //stop custom loader for api call
      this.loaderService.isLoading.next(0 > 0)
    });
  }

  // search method using debounce
  searchFilters() {
    this.citySearchQuery
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        let city = value ? value : '';
        this.getForeCast(city);
      });
  }

  getMoreDetails() {
    const dialogRef = this.dialog.open(ForecastModalComponent, {
      width: '800px',
      data: {
        city: `${this.cityData['name']}, ${this.cityData['country']}`,
        moreDetails: this.foreCastData
      },
      restoreFocus: false
    });
  }

  //clear search data
  clearSearch(){
    this.citySearchQueryString = null;
    this.citySearchQuery.next();
    this.searchFilters();
  }

}
