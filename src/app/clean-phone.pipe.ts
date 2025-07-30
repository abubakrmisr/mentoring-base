import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanPhone',
  standalone: true,
})
export class CleanPhonePipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== 'string') return '';

    const cleaned = value.replace(/[-()]/g, '').trim();

    return cleaned.length > 11 ? cleaned.slice(0, 11) : cleaned;
  }
}
