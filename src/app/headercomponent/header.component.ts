import { Component } from "@angular/core";

const menuHeader = (item: string): string => item;
const menuHeaderNew = menuHeader('О компании');

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
}) 

export class HeaderComponent {
    
    readonly headerItem1 = 'Главная';
    readonly aboutCompany = menuHeaderNew;
    readonly headerItem3 = 'Каталог';
    readonly header2Item1 = 'Каталог';
    readonly header2Item2 = 'Стройматериалы';
    readonly header2Item3 = 'Инструменты';
    readonly header2Item4 = 'Электрика';
    readonly header2Item5 = 'Интерьер и одежда';
  
    
}