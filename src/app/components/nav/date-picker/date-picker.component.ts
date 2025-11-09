import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ForecastStateService } from '../../../services/forecastState.service';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [MatDatepickerModule, MatNativeDateModule, FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent implements AfterViewInit {
  selectedDate = new Date(2023, 10, 23);
  minDate = new Date(2023, 10, 23);
  maxDate = new Date(2023, 10, 23);

  constructor(private _ForecastStateService: ForecastStateService) {
    this.maxDate.setDate(this.maxDate.getDate() + 4);
  }

  ngAfterViewInit(): void {
    this._ForecastStateService.setDate(this.transform(this.selectedDate));
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    const transformed = this.transform(this.selectedDate);
    this._ForecastStateService.setDate(transformed);
  }

  transform(date: Date): Date {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return new Date(local.getFullYear(), local.getMonth(), local.getDate());
  }
}
