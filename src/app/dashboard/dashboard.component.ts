import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { WeatherService } from '../service/weather.service';
import { LoaderService } from '../service/loader.service';
import { ForeCast, City, cityData } from '../model/model';
import myJson from '../../assets/city.json';
import { ForecastModalComponent } from '../shared/forecast-modal/forecast-modal.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: cityData[] = myJson;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['city', 'state', 'country', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  }

  ngOnInit() {
    this.infoMsg = `Please search city to check today's weather!`;
    this.reAssignData();
  }

  getForeCast(param: string) {
    //enable custom loader for api call
    this.loaderService.isLoading.next(true);
    this.weatherService.getForeCastData(param).subscribe(
      res => {
        this.foreCastData = res['list'][0];
        this.cityData = res['city'];
      },
      err => {
        this.foreCastData = null;
        this.infoMsg = `Please enter valid city name!`;
      }
    ).add(() => {
      //stop custom loader for api call
      this.loaderService.isLoading.next(0 > 0)
      this.getMoreDetails();
    });
  }

  getMoreDetails() {
    const dialogRef = this.dialog.open(ForecastModalComponent, {
      width: '600px',
      data: {
        city: `${this.cityData['name']}, ${this.cityData['country']}`,
        moreDetails: this.foreCastData
      },
      restoreFocus: false
    });
  }

  //clear search input
  clearSearch() {
    this.citySearchQueryString = null;
    this.reAssignData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reAssignData() {
    this.dataSource = new MatTableDataSource(myJson);
    this.dataSource.paginator = this.paginator;
  }

}