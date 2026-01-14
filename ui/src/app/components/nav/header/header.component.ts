import {
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ForecastStateService } from '../../../services/forecastState.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    SearchBarComponent,
    DatePickerComponent,
    MatSlideToggleModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean = false;
  isCelsius: boolean = true;
  showMiddlePart: boolean = true;

  constructor(private _ThemeService: ThemeService, private _ForecasteStateService: ForecastStateService) {}

  ngOnInit() {
    this.isDarkMode = this._ThemeService.isDarkTheme();
    this.setMiddlePlace();
  }

  @HostListener('window:resize', [])
  setMiddlePlace(): void {
    const width = window.innerWidth;
    if (width > 800) {
      this.showMiddlePart = true;
    } else {
      this.showMiddlePart = false;
    } 
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this._ThemeService.toggleTheme();
  }
  toggleUnit() {
    this.isCelsius = !this.isCelsius;
    this._ForecasteStateService.setIsCelsius(this.isCelsius);
  }
}
