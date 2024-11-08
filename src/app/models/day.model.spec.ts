import { Day } from './day.model';
import { Month } from './months';
import { WeekDay } from './week-day';

describe('Day', () => {
  let day: Day;

  it('should build a correct day 1', () => {
    day = new Day(2001, Month.JANUARY, 1);

    expect(day.year).toBe(2001);
    expect(day.month).toBe(Month.JANUARY);
    expect(day.dayNumber).toBe(1);
    expect(day.id).toBe('2001-01-01');
    expect(day.weekDay).toBe(WeekDay.MONDAY);
  })

  it('should build a correct day 2', () => {
    day = new Day(2001, Month.JULY, 21);

    expect(day.year).toBe(2001);
    expect(day.month).toBe(Month.JULY);
    expect(day.dayNumber).toBe(21);
    expect(day.id).toBe('2001-07-21');
    expect(day.weekDay).toBe(WeekDay.SATURDAY);
  })
});
