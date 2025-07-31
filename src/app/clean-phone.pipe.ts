import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanPhone',
  standalone: true,
})
export class CleanPhonePipe implements PipeTransform {
  transform(value: string): string {
    const cleaned: string = value.replace(/[-()]/g, '').trim();
    return cleaned;
  }
}
