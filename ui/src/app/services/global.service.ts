import { Injectable } from '@angular/core';
import { ProductionEnvironment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  hostName: string = ProductionEnvironment.apiUrl;
  forecastRoute: string = '';
}
