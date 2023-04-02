import { DatePipe } from '@angular/common';

export function getDateFormat(data: Date): string {
  const datePipe = new DatePipe('pt-br');
  return datePipe.transform(data, 'yyyy-MM-dd', 'UTC')!;
}

export function getDateFormatByObject(obj: any): string {
  const date = new Date(`${obj.year}-${obj.month}-${obj.day}`);
  return getDateFormat(date);
}
