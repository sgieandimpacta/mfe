export function stringByOnlyNumbers(string: string): string {
  return string.replace(/\D/g, '');
}
