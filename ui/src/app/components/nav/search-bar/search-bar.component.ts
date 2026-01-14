import {
  Component,
  Output,
  OnInit,
  OnDestroy,
  EventEmitter,
} from '@angular/core';
import ForecastResponse from '../../../interfaces/forecastResponse';
import { ForecastService } from '../../../services/forecast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForecastStateService } from '../../../services/forecastState.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  forecastSubscription: any;
  citiesVisible: boolean = false;
  cities: ForecastResponse[] = [];
  cityId: string = '';
  filteredCities: ForecastResponse[] = [];
  selectedCity: ForecastResponse | null = null;

  constructor(
    private _Router: Router,
    private _ForecastService: ForecastService,
    private _ForecastStateService: ForecastStateService
  ) {}

  ngOnInit() {
    this.getCitiesForecast();
  }

  toggleCities() {
    this.citiesVisible = !this.citiesVisible;
  }

  resetCityForecast() {
    this.citiesVisible = false;
    this._ForecastStateService.setCity(null);
    this.selectedCity = null;
    this._Router.navigate(['/forecast']);
  }

  selectCity(city: ForecastResponse) {
    this._ForecastStateService.setCity(city);
    this.citiesVisible = false;
    this.selectedCity = city;
    this._Router.navigate(['/forecast', city.id]);
  }

  search(searchValue: string) {
    this.filteredCities = this.cities.filter((item) =>
      item.city.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  getCitiesForecast() {
    this.forecastSubscription = this._ForecastService
      .getAllForecasts()
      .subscribe({
        next: (data) => {
          this.cities = data;
          this.filteredCities = data;
        },
        error: (err) => {
          console.error('Error fetching cities:', err);
          return [];
        },
      });
  }

  ngOnDestroy() {
    if (this.forecastSubscription) {
      this.forecastSubscription.unsubscribe();
    }
  }
}
