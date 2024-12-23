import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import { Month } from '../models/months.enum';
import { Day } from '../models/day.model';
import { WeekDay } from '../models/week-day.enum';
import { WorkDayStatus } from '../models/work-day-status.enum';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a correct month id', () => {
    expect(service['makeMonthId'](2006, Month.JANUARY)).toEqual('2006-01');
  });

  it('should create a correct month', () => {
    const days = service['generateMonthDays'](2006, Month.JANUARY);

    expect(days.length).toBe(31);
    expect(days[0].year).toBe(2006);
    expect(days[0].month).toBe(Month.JANUARY);
    expect(days[0].dayNumber).toBe(1);
    expect(days[0].weekDay).toBe(WeekDay.SUNDAY);
    expect(days[0].id).toBe('2006-01-01');
    expect(days[30].dayNumber).toBe(31);
    expect(days[30].weekDay).toBe(WeekDay.TUESDAY);
  });

  it('should create and retrieve a month', () => {
    const days = service['getMonthDays'](2006, Month.JANUARY);

    expect(days.length).toBe(31);
    expect(days[0].year).toBe(2006);
    expect(days[0].month).toBe(Month.JANUARY);
    expect(days[0].dayNumber).toBe(1);
    expect(days[0].weekDay).toBe(WeekDay.SUNDAY);
    expect(days[0].id).toBe('2006-01-01');
    expect(days[30].dayNumber).toBe(31);
    expect(days[30].weekDay).toBe(WeekDay.TUESDAY);
  });

  it('should create a month only once', () => {
    const days1 = service['getMonthDays'](2006, Month.JANUARY);
    const days2 = service['getMonthDays'](2006, Month.JANUARY);

    expect(days1).toBe(days2);
  });

  it('should give correct day position for a week starting on Sunday', () => {
    service.firstDayOfTheWeek = WeekDay.SUNDAY;
    const days = service['generateMonthDays'](2006, Month.JANUARY);

    expect(days.length).toBe(31);
    expect(days[0].weekDay).toBe(WeekDay.SUNDAY);
    expect(service.getDayPosition(days[0].weekDay)).toBe(1);
    expect(days[1].weekDay).toBe(WeekDay.MONDAY);
    expect(service.getDayPosition(days[1].weekDay)).toBe(2);
    expect(days[2].weekDay).toBe(WeekDay.TUESDAY);
    expect(service.getDayPosition(days[2].weekDay)).toBe(3);
    expect(days[6].weekDay).toBe(WeekDay.SATURDAY);
    expect(service.getDayPosition(days[6].weekDay)).toBe(7);
  });

  it('should create a correct week of days starting on Sunday', () => {
    service.firstDayOfTheWeek = WeekDay.SUNDAY;
    const weekdays = service.getOrderedWeekDays();

    expect(weekdays.length).toBe(7);
    expect(weekdays[0]).toBe(WeekDay.SUNDAY);
    expect(weekdays[1]).toBe(WeekDay.MONDAY);
    expect(weekdays[2]).toBe(WeekDay.TUESDAY);
    expect(weekdays[3]).toBe(WeekDay.WEDNESDAY);
    expect(weekdays[4]).toBe(WeekDay.THURSDAY);
    expect(weekdays[5]).toBe(WeekDay.FRIDAY);
    expect(weekdays[6]).toBe(WeekDay.SATURDAY);
  });

  it('should create a correct week of days starting on Monday', () => {
    service.firstDayOfTheWeek = WeekDay.MONDAY;
    const weekdays = service.getOrderedWeekDays();

    expect(weekdays.length).toBe(7);
    expect(weekdays[0]).toBe(WeekDay.MONDAY);
    expect(weekdays[1]).toBe(WeekDay.TUESDAY);
    expect(weekdays[2]).toBe(WeekDay.WEDNESDAY);
    expect(weekdays[3]).toBe(WeekDay.THURSDAY);
    expect(weekdays[4]).toBe(WeekDay.FRIDAY);
    expect(weekdays[5]).toBe(WeekDay.SATURDAY);
    expect(weekdays[6]).toBe(WeekDay.SUNDAY);
  });

  it('should count the total worked days', () => {
    const days: Day[] = [];
    for (let i = 1; i <= 10; i++) {
      days.push(new Day(new Date(2006, Month.JANUARY, i)));
    }
    days[1].status = WorkDayStatus.FULL_DAY;
    days[2].status = WorkDayStatus.FULL_DAY;
    days[8].status = WorkDayStatus.HALF_DAY;
    days[9].status = WorkDayStatus.FULL_DAY;

    expect(service.getWorkedDaysCount(days)).toBe(3.5);
  });

  it('should create a correct next month', () => {
    service['_currentDate'] = new Date(2006, Month.JANUARY, 1);
    const days = service.setToNextMonth();

    expect(days.length).toBe(28);
    expect(days[0].year).toBe(2006);
    expect(days[0].month).toBe(Month.FEBRUARY);
    expect(days[0].dayNumber).toBe(1);
    expect(days[0].weekDay).toBe(WeekDay.WEDNESDAY);
    expect(days[0].id).toBe('2006-02-01');
  });

  it('should create a correct previous month', () => {
    service['_currentDate'] = new Date(2006, Month.JANUARY, 1);
    const days = service.setToPreviousMonth();

    expect(days.length).toBe(31);
    expect(days[0].year).toBe(2005);
    expect(days[0].month).toBe(Month.DECEMBER);
    expect(days[0].dayNumber).toBe(1);
    expect(days[0].weekDay).toBe(WeekDay.THURSDAY);
    expect(days[0].id).toBe('2005-12-01');
  });
});
