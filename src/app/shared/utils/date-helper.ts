import { DatePipe } from '@angular/common';
import { DatePicker } from '../models/DatePicker';

export function getDateFormat(data: Date): string {
  const datePipe = new DatePipe('pt-br');
  return datePipe.transform(data, 'yyyy-MM-dd', 'UTC')!;
}

export function getDateFormatByObject(obj: any): string {
  const date = new Date(`${obj.year}-${obj.month}-${obj.day}`);
  return getDateFormat(date);
}

export function defineObjectDateToDatePicker(stringDate: string): DatePicker {
  let date = new Date(stringDate);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}
