import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  hostName: string = '';

  constructor(
    private _HTTPClient: HttpClient,
    private _GlobalService: GlobalService
  ) {
    this.hostName = this._GlobalService.hostName;
  }

  getForecast(cityId: string): Observable<any> {
    return this._HTTPClient.get(
      `${this.hostName}/cityForecast/${cityId}`
    );
  }

  getAllForecasts(): Observable<any> {
    return this._HTTPClient.get(
      `${this.hostName}/forecast`
    );
  }
}
