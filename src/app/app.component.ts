import { Component } from '@angular/core';
import { MonthCalendarComponent } from "./components/month-calendar/month-calendar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MonthCalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'monthly-workdays';
}
