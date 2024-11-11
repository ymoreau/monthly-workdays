import { Month } from './months.enum';
import { WeekDay } from './week-day.enum';
import { WorkDayStatus } from './work-day-status.enum';

/**
 * Model for a day, it does not verify of the date consistency.
 * weekDay is retrieved by Date.getDay()
 */
export class Day {
  public readonly id: string;
  public readonly weekDay: WeekDay;

  public status = WorkDayStatus.UNSELECTED;

  constructor(
    public readonly year: number,
    public readonly month: Month,
    public readonly dayNumber: number
  ) {
    this.id = year.toString() + '-' + String(month +1 ).padStart(2, '0') + '-' + String(dayNumber).padStart(2, '0');
    this.weekDay = (new Date(year, month, dayNumber).getDay()) as WeekDay;
  }

  toggleStatus(): void {
    this.status++;
    if (this.status > WorkDayStatus.HALF_DAY) {
      this.status = WorkDayStatus.UNSELECTED;
    }
  }
}
