import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Day } from '../../models/day.model';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-month-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './month-calendar.component.html',
  styleUrl: './month-calendar.component.scss'
})
export class MonthCalendarComponent {
  days: Day[] = [];
  headers = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  private readonly calendarService = inject(CalendarService);

  constructor() {
    this.days = this.calendarService.currentMonthDays();
  }

  dayColumnPosition(day: Day): number {
    return this.calendarService.getDayPosition(day.weekDay);
  }
}
