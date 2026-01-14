import { Component, OnInit, OnDestroy } from '@angular/core';
import ForecastResponse from '../../interfaces/forecastResponse';
import { CommonModule, DatePipe } from '@angular/common';
import { ForecastService } from '../../services/forecast.service';
import DetailedForecast, {
  DetailedForecastDay,
} from '../../interfaces/detailedForecast';
import { ForecastDescriptionService } from '../../services/forecastDescription.service';
import { ForecastStateService } from '../../services/forecastState.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city-forecast',
  imports: [DatePipe, CommonModule],
  providers: [DatePipe],
  templateUrl: './city-forecast.component.html',
  styleUrl: './city-forecast.component.scss',
})
export class CityForecastComponent implements OnInit, OnDestroy {
  city!: ForecastResponse | null;
  date!: Date;
  isCelsius: boolean = true;
  forecasts?: DetailedForecast;
  selectedDate: string = '';
  selectedForecastDay: number = -1;
  cityId: string = '';
  loading: boolean = true;

  private subscriptions: Subscription[] = [];

  constructor(
    private _DatePipe: DatePipe,
    private _ForecastService: ForecastService,
    private _ForecastDescriptionService: ForecastDescriptionService,
    private _ForecastStateService: ForecastStateService,
    private _Route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this._Route.paramMap.subscribe((params) => {
        const id = params.get('cityId');
        if (id) {
          this.cityId = id;
          this.tryLoadForecast();
        }
      })
    );

    this.subscriptions.push(
      this._ForecastStateService.city$.subscribe((city) => {
        if (city) {
          this.city = city;
          this.tryLoadForecast();
        }
      })
    );
    this.subscriptions.push(
      this._ForecastStateService.date$.subscribe((date) => {
        this.date = date;
        this.tryLoadForecast();
      })
    );
    this.subscriptions.push(
      this._ForecastStateService.isCelsius$.subscribe((unit) => {
        this.isCelsius = unit;
      })
    );
  }

  private tryLoadForecast(): void {
    const cityIdToUse = this.city?.id?.toString() || this.cityId;
    if (!cityIdToUse || !this.date) return;

    this.loadForecastsForCity(cityIdToUse);
  }

  private loadForecastsForCity(cityId: string): void {
    this.loading = true;
    this.selectedDate = this._DatePipe.transform(this.date, 'yyyy-MM-dd')!;

    this._ForecastService.getForecast(cityId).subscribe({
      next: (data) => {
        let detailedForecastDays: DetailedForecastDay[] = [];
        for (let day of data.forecast) {
          const details =
            this._ForecastDescriptionService.getWeatherDescriptionWithImg(
              day.temperatureCelsius,
              day.humidity
            );

          detailedForecastDays.push({
            date: day.date,
            temperatureCelsius: day.temperatureCelsius,
            temperatureFahrenheit: day.temperatureFahrenheit,
            humidity: day.humidity,
            description: details.description,
            img: details.img,
          });

          if (day.date === this.selectedDate) {
            this.selectedForecastDay = detailedForecastDays.length - 1;
          }
        }

        this.forecasts = {
          id: data.id,
          city: data.city,
          forecast: detailedForecastDays,
        };
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching forecasts:', error);
        this.loading = false;
      },
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
