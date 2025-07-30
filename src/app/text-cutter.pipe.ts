import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCutter',
  standalone: true
})
export class TextCutterPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return value.length > 20 ? value.slice(0, 20) + '...': value;
  }

}
