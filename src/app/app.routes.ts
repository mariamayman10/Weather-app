import { Routes } from '@angular/router';
import { CityForecastComponent } from './components/city-forecast/city-forecast.component';
import { ForecastsOverviewComponent } from './components/forecasts-overview/forecasts-overview.component';

export const routes: Routes = [
  { path: '', redirectTo: 'forecast', pathMatch: 'full' },
  { path: 'forecast/:cityId', component: CityForecastComponent },
  { path: 'forecast', component: ForecastsOverviewComponent },
  { path: '**', redirectTo: 'forecast' },
];
