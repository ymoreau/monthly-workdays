import { Month } from './months.enum';
import { WeekDay } from './week-day.enum';
import { WorkDayStatus } from './work-day-status.enum';

/**
 * Model for a day, it does not verify of the date consistency.
 * weekDay is retrieved by Date.getDay()
 */
export class Day {
  public readonly id: string;

  public status = WorkDayStatus.UNSELECTED;

  constructor(public readonly date: Date) {
    this.id = date.getFullYear().toString() + '-' + String(date.getMonth() +1 ).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  }

  public get year(): number {
    return this.date.getFullYear();
  }

  public get month(): Month {
    return this.date.getMonth();
  }

  public get dayNumber(): number {
    return this.date.getDate();
  }

  public get weekDay(): WeekDay {
    return this.date.getDay();
  }

  public toggleStatus(): void {
    this.status++;
    if (this.status > WorkDayStatus.HALF_DAY) {
      this.status = WorkDayStatus.UNSELECTED;
    }
  }
}
