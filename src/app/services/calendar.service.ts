import { Injectable } from '@angular/core';
import { Month } from '../models/months.enum';
import { Day } from '../models/day.model';
import { WeekDay } from '../models/week-day.enum';
import { WorkDayStatus } from '../models/work-day-status.enum';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public firstDayOfTheWeek = WeekDay.MONDAY;

  private _currentDate: Date;
  private _monthMap = new Map<string, Day[]>();

  constructor() {
    this._currentDate = new Date();
  }

  /**
   * @returns the first day of the current month to display
   */
  public currentDate(): Date {
    return this._currentDate;
  }

  /**
   * @returns ordered array of the days of the current displayed month
   */
  public currentMonthDays(): Day[] {
    return this.getMonthDays(this._currentDate.getFullYear(), this._currentDate.getMonth());
  }

  /**
   * Set the previous month as the current displayed month
   * @returns ordered array of the days of the new current displayed month
   */
  public setToPreviousMonth(): Day[] {
    this._currentDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth() - 1);
    return this.currentMonthDays();
  }

  /**
   * Set the next month as the current displayed month
   * @returns ordered array of the days of the new current displayed month
   */
  public setToNextMonth(): Day[] {
    this._currentDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth() + 1);
    return this.currentMonthDays();
  }

  /**
   * Compute the relative position of the given week-day when a week starts with CalendarService.firstDayOfTheWeek,
   * CalendarService.firstDayOfTheWeek being position 1.
   * @returns Position [1-7] relative to CalendarService.firstDayOfTheWeek
   */
  public getDayPosition(weekDay: WeekDay): number {
    let pos = weekDay - this.firstDayOfTheWeek;
    if (pos < 0) { // Negative pos means reverse pos from end of the week
      pos = 7 + pos; // <=> 7 - abs(pos)
    }
    return pos + 1; // Days start at zero but our position starts at 1
  }

  /**
   * @returns the days of the week starting by firstDayOfTheWeek
   */
  public getOrderedWeekDays(): WeekDay[] {
    const weekdays: WeekDay[] = [];

    let i = this.firstDayOfTheWeek;
    do {
      weekdays.push(i);

      i++;
      if (i > WeekDay.SATURDAY) {
        i = WeekDay.SUNDAY;
      }
    } while (i !== this.firstDayOfTheWeek)

    return weekdays;
  }

  /**
   * Count the total work days based on Day.status of the given array
   * @returns Total of full days (counting half days as half a full day)
   */
  public getWorkedDaysCount(days: Day[]): number {
    let count = 0;
    for (const day of days) {
      const status = day.status;
      if (status === WorkDayStatus.FULL_DAY) {
        count += 1;
      } else if (status === WorkDayStatus.HALF_DAY) {
        count += 0.5;
      }
    }
    return count;
  }

  private makeMonthId(year: number, month: Month): string {
    return year.toString() + '-' + String(month +1 ).padStart(2, '0');
  }

  /**
   * Generates and returns an ordered array of the days of the given year and month
   */
  private generateMonthDays(year: number, month: Month): Day[] {
    const days: Day[] = [];

    const monthDaysCount = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= monthDaysCount; i++) {
      days.push(new Day(new Date(year, month, i)));
    }

    return days;
  }

  /**
   * Retrieves or create if necessary the array of days
   * @returns ordered array of the days for the given month
   */
  private getMonthDays(year: number, month: Month): Day[] {
    const monthId = this.makeMonthId(year, month);

    if (!this._monthMap.has(monthId)) {
      this._monthMap.set(monthId, this.generateMonthDays(year, month));
    }

    let days = this._monthMap.get(monthId);
    if (!days) {
      days = [];
    }
    return days;
  }
}
