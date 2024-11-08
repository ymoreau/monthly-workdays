import { Month } from './months';
import { WeekDay } from './week-day';

/**
 * Model for a day, it does not verify of the date consistency.
 * weekDay is retrieved by Date.getDay()
 */
export class Day {
  public readonly id: string;
  public readonly weekDay: WeekDay;

  constructor(
    public readonly year: number,
    public readonly month: Month,
    public readonly dayNumber: number
  ) {
    this.id = year.toString() + '-' + String(month +1 ).padStart(2, '0') + '-' + String(dayNumber).padStart(2, '0');
    this.weekDay = (new Date(year, month, dayNumber).getDay()) as WeekDay;
  }

}
