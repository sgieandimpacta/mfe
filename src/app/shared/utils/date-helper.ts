import { DatePipe } from '@angular/common';

export function getDateTimeFormat(data: Date): string {
  const datePipe = new DatePipe('pt-br');
  return datePipe.transform(data, 'yyyy-MM-dd', 'UTC')!;
}
