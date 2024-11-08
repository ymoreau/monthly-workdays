import { Injectable } from '@angular/core';
import { Month } from '../models/months';
import { Day } from '../models/day.model';
import { WeekDay } from '../models/week-day';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public firstDayOfTheWeek = WeekDay.MONDAY;

  /**
   * @returns ordered array of the days of the current month
   */
  currentMonthDays(): Day[] {
    const date = new Date();
    return this.monthDays(date.getFullYear(), date.getMonth() as Month);
  }

  /**
   * @returns ordered array of the days of the given year and month
   */
  monthDays(year: number, month: Month): Day[] {
    const days: Day[] = [];

    const monthDaysCount = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= monthDaysCount; i++) {
      days.push(new Day(year, month, i));
    }

    return days;
  }

  /**
   * Compute the relative position of the given week-day when a week starts with CalendarService.firstDayOfTheWeek,
   * CalendarService.firstDayOfTheWeek being position 1.
   * @returns Position [1-7] relative to CalendarService.firstDayOfTheWeek
   */
  getDayPosition(weekDay: WeekDay): number {
    let pos = weekDay - this.firstDayOfTheWeek;
    if (pos < 0) { // Negative pos means reverse pos from end of the week
      pos = 7 + pos; // <=> 7 - abs(pos)
    }
    return pos + 1; // Days start at zero but our position starts at 1
  }
}
