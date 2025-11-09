import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  hostName: string = environment.apiUrl;
  forecastRoute: string = '';
}
