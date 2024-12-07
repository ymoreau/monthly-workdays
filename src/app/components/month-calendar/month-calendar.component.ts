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
  headers = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  disabledDays = [WeekDay.SATURDAY, WeekDay.SUNDAY];
  currentMonthLabel = '';

  readonly WorkDayStatus = WorkDayStatus; // Alias for HTML template

  private readonly calendarService = inject(CalendarService);

  constructor() {
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
    this.currentMonthLabel = date.toLocaleString('en-EN', { month: 'long' }) + ' ' + date.getFullYear();
  }
}
