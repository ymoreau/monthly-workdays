import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Day } from '../../models/day.model';
import { WeekDay } from '../../models/week-day.enum';
import { WorkDayStatus } from '../../models/work-day-status.enum';
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
  headers: string[];
  headers_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  disabledDays = [WeekDay.SATURDAY, WeekDay.SUNDAY];
  currentMonthLabel = '';

  readonly WorkDayStatus = WorkDayStatus; // Alias for HTML template

  private readonly calendarService = inject(CalendarService);

  constructor() {
    this.headers = this.calendarService.getOrderedWeekDays().map((weekday) => this.headers_labels[weekday as number]);

    this.days = this.calendarService.currentMonthDays();
    this.refreshMonthLabel();
  }

  dayColumnPosition(day: Day): number {
    return this.calendarService.getDayPosition(day.weekDay);
  }

  isDayDisabled(weekDay: WeekDay): boolean {
    return this.disabledDays.includes(weekDay);
  }

  workDaysCount(): number {
    return this.calendarService.getWorkedDaysCount(this.days);
  }

  goToPreviousMonth(): void {
    this.days = this.calendarService.setToPreviousMonth();
    this.refreshMonthLabel();
  }

  goToNextMonth(): void {
    this.days = this.calendarService.setToNextMonth();
    this.refreshMonthLabel();
  }

  private refreshMonthLabel(): void {
    this.days = this.calendarService.currentMonthDays();
    const date = this.calendarService.currentDate();
    this.currentMonthLabel = date.toLocaleString('en-GB', { month: 'long' }) + ' ' + date.getFullYear();
  }
}
