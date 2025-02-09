import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const menuHeader = (item: string): string => item;
const menuHeaderNew = menuHeader('О компании');

const newPages = [5, 4, 3, 2, 1]

const menuItems = ["каталог", "стройматериалы", "инструменты", "электрика", "интерьер и одежда"]

const upperCaseMenuItems = menuItems.map((item) => {
  return item.toUpperCase();
}
);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'mentoring-base';

  isShowSadMan = true;

  readonly headerItem1 = 'Главная';

  readonly aboutCompany = menuHeaderNew;

  readonly headerItem3 = 'Каталог';

  readonly header2Item1 = 'Каталог';

  readonly header2Item2 = 'Стройматериалы';

  readonly header2Item3 = 'Инструменты';

  readonly header2Item4 = 'Электрика';

  readonly header2Item5 = 'Интерьр и одежда';

  readonly newPages = newPages;
  
  menuItems = upperCaseMenuItems;
  
  isUpperCase = true;
  
  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map(
      (item) => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    )
    
    this.isUpperCase = !this.isUpperCase;
  }
  
  isShowImg = true;

}
