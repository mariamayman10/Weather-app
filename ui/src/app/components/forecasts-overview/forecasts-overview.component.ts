import { ForecastDescriptionService } from './../../services/forecastDescription.service';
import { Component, Input, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { ForecastService } from '../../services/forecast.service';
import ForecastResponse, {
  ForecastDay,
} from '../../interfaces/forecastResponse';
import { FormsModule } from '@angular/forms';
import DetailedForecast, {
  DetailedForecastDay,
} from '../../interfaces/detailedForecast';
import { DatePipe } from '@angular/common';
import { ForecastStateService } from '../../services/forecastState.service';

@Component({
  selector: 'app-forecasts-overview',
  imports: [FormsModule],
  providers: [DatePipe],
  templateUrl: './forecasts-overview.component.html',
  styleUrl: './forecasts-overview.component.scss',
})
export class ForecastsOverviewComponent
  implements OnInit, OnDestroy
{
  date!: Date;
  isCelsius!: boolean;
  forecastSubscription: any;
  forecasts: DetailedForecast[] = [];

  constructor(
    private _ForecastService: ForecastService,
    private _ForecastDescriptionService: ForecastDescriptionService,
    private _ForecastStateService: ForecastStateService,
    private _DatePipe: DatePipe
  ) {}

  ngOnInit() {
    this._ForecastStateService.date$.subscribe((date) => {
      this.date = date;
      this.loadForecastsForDate();
    });
    this._ForecastStateService.isCelsius$.subscribe((unit) => {
      this.isCelsius = unit;
      this.loadForecastsForDate();
    });
  }

  loadForecastsForDate() {
    const selectedDateStr = this._DatePipe.transform(this.date, 'yyyy-MM-dd')!;
    this.forecastSubscription = this._ForecastService
      .getAllForecasts()
      .subscribe({
        next: (data) => {
          this.forecasts = data.map((forecast: ForecastResponse) => {
            const filteredForecastDays = forecast.forecast
              .filter(
                (forecastDay: ForecastDay) =>
                  forecastDay.date === selectedDateStr
              )
              .map((forecastDay: ForecastDay): DetailedForecastDay => {
                const details =
                  this._ForecastDescriptionService.getWeatherDescriptionWithImg(
                    forecastDay.temperatureCelsius,
                    forecastDay.humidity
                  );
                return {
                  ...forecastDay,
                  description: details.description,
                  img: details.img,
                };
              });

            return {
              id: forecast.id,
              city: forecast.city,
              forecast: filteredForecastDays,
            };
          });
        },
        error: (error) => {
          console.error('Error fetching forecasts:', error);
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
