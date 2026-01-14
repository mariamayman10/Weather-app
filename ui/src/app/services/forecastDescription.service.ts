import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForecastDescriptionService {
  constructor() {}

  getWeatherDescriptionWithImg(
    tempC: number,
    humidity: number
  ): { description: string; img: string } {
    let description = '';

    if (humidity >= 80 && tempC < 25) {
      description = 'Rainy';
    } else if (humidity >= 70) {
      description = 'Humid';
    } else if (tempC <= 10) {
      description = 'Cold';
    } else if (tempC >= 30) {
      description = 'Sunny';
    } else if (tempC > 10 && tempC <= 20) {
      description = 'Partly Cloudy';
    } else {
      description = 'Clear';
    }

    const date = new Date();
    const hour = date.getHours();
    const timeOfDay: 'M' | 'N' =
      hour >= 6 && hour < 18 ? 'M' : 'N';

    let img = this.getIconUrl(timeOfDay, description);

    return { description, img };
  }

  getIconUrl(timeOfDay: 'M' | 'N', description: string): string {
    const basePath = 'forecast-imgs/';
    if(description === 'Rainy') {
      return `${basePath}rainy.png`;
    } else if(description === 'Humid') {
      return `${basePath}humid.png`;
    } else if(description === 'Cold') {
      return `${basePath}cold.png`;
    } else if(description === 'Sunny') {
      return `${basePath}sunny.png`;
    } else if(description === 'Partly Cloudy') {
      return timeOfDay == 'M'
        ? `${basePath}partly_cloudy_sun.png`
        : `${basePath}partly_cloudy_moon.png`;
    } else {
      return timeOfDay == 'M'
        ? `${basePath}clear_sun.png`
        : `${basePath}clear_moon.png`;
    }
  }
}
