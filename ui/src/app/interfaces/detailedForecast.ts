export default interface DetailedForecast {
  id: number;
  city: string;
  forecast: DetailedForecastDay[];
}
export interface DetailedForecastDay {
  date: string;
  temperatureCelsius: number;
  temperatureFahrenheit: number;
  humidity: number;
  description: string;
  img: string;
}