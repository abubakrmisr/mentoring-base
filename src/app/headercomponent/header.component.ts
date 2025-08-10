import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable, timer, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ButtonHoverColorDirective } from '../directives/buttonHoverColor.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgFor,
    DatePipe,
    AsyncPipe,
    ButtonHoverColorDirective
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  readonly headerItem1 = 'Главная';
  readonly headerItem2 = 'О компании';
  readonly headerItem3 = 'Каталог';

  today$: Observable<Date> = timer(0, 1000).pipe(
    map(() => new Date())
  );
  
  isUpperCase = false;
  headerItems = [
    'Каталог',
    'Стройматериалы',
    'Инструменты',
    'Электрика',
    'Интерьер и одежда',
  ];

  toggleCase(): void {
    this.isUpperCase = !this.isUpperCase;
    this.headerItems = this.headerItems.map((item: string) =>
      this.changeFirstLetterCase(item)
    );
  }

  changeFirstLetterCase(text: string): string {
    return text
      .split(' ')
      .map((word: string) =>
        this.isUpperCase
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          : word.charAt(0).toLowerCase() + word.slice(1)
      )
      .join(' ');
  }
}
