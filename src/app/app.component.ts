import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const menuHeader = (item: string): string => item;
const menuHeaderNew = menuHeader ('О компании');
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
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

}
