import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-homeContent',
  standalone: true,
  imports: [NgIf],
  templateUrl: './app-home-content.component.html',
  styleUrls: ['./app-home-content.component.scss'],
})
export class HomeContentComponent {
  title = 'mentoring-base';

  isShowSadMan = true;

  isUpperCase = true;

  menuItems: string[] = [
    'Каталог',
    'Стройматериалы',
    'Инструменты',
    'Электрика',
    'Интерьер и одежда',
  ];

  readonly headerItem1 = 'Главная';
  readonly headerItem2 = 'О компании';
  readonly headerItem3 = 'Каталог';

  upperCaseMenuItems = this.menuItems;

  changeMenuText() {
    this.menuItems = this.upperCaseMenuItems.map((item: string) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    );
    this.isUpperCase = !this.isUpperCase;
  }
}
