import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ForecastResponse from '../interfaces/forecastResponse';

@Injectable({ providedIn: 'root' })
export class ForecastStateService {
  city$ = new BehaviorSubject<ForecastResponse | null>(null);
  date$ = new BehaviorSubject<Date>(new Date(2023, 10, 23));
  isCelsius$ = new BehaviorSubject<boolean>(true);

  setCity(city: ForecastResponse|null) {
    this.city$.next(city);
  }

  setDate(date: Date) {
    this.date$.next(date);
    console.log(date);
  }

  setIsCelsius(isCelsius: boolean) {
    this.isCelsius$.next(isCelsius);
  }
}
