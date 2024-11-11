import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import { Month } from '../models/months.enum';
import { WeekDay } from '../models/week-day.enum';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a correct month', () => {
    const days = service.monthDays(2006, Month.JANUARY);

    expect(days.length).toBe(31);
    expect(days[0].year).toBe(2006);
    expect(days[0].month).toBe(Month.JANUARY);
    expect(days[0].dayNumber).toBe(1);
    expect(days[0].weekDay).toBe(WeekDay.SUNDAY);
    expect(days[0].id).toBe('2006-01-01');
    expect(days[30].dayNumber).toBe(31);
    expect(days[30].weekDay).toBe(WeekDay.TUESDAY);
  });

  it('should give correct day position for a week starting on Sunday', () => {
    service.firstDayOfTheWeek = WeekDay.SUNDAY;
    const days = service.monthDays(2006, Month.JANUARY);

    expect(days.length).toBe(31);
    expect(days[0].weekDay).toBe(WeekDay.SUNDAY);
    expect(service.getDayPosition(days[0].weekDay)).toBe(1);
    expect(days[1].weekDay).toBe(WeekDay.MONDAY);
    expect(service.getDayPosition(days[1].weekDay)).toBe(2);
    expect(days[2].weekDay).toBe(WeekDay.TUESDAY);
    expect(service.getDayPosition(days[2].weekDay)).toBe(3);
    expect(days[6].weekDay).toBe(WeekDay.SATURDAY);
    expect(service.getDayPosition(days[6].weekDay)).toBe(7);
  })
});
