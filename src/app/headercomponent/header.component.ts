import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  readonly headerItem1 = 'Главная';
  readonly headerItem2 = 'О компании';
  readonly headerItem3 = 'Каталог';

  isUpperCase = false;
  headerItems = [
    'Каталог',
    'Стройматериалы',
    'Инструменты',
    'Электрика',
    'Интерьер и одежда',
  ];

  toggleCase() {
    this.isUpperCase = !this.isUpperCase;
    this.headerItems = this.headerItems.map((item) =>
      this.changeFirstLetterCase(item)
    );
  }

  changeFirstLetterCase(text: string): string {
    return text
      .split(' ')
      .map((word) =>
        this.isUpperCase
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          : word.charAt(0).toLowerCase() + word.slice(1)
      )
      .join(' ');
  }
}
