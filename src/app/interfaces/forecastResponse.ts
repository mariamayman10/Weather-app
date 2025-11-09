export default interface ForecastResponse {
  id: number;
  city: string;
  forecast: ForecastDay[];
}
export interface ForecastDay {
  date: string;
  temperatureCelsius: number;
  temperatureFahrenheit: number;
  humidity: number;
}