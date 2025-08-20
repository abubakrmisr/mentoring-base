import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable, timer, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ButtonHoverColorDirective } from '../directives/buttonHoverColor.directive';
import { MatDialog } from '@angular/material/dialog';
import { AuthRoleDialogComponent } from '../auth-role-dialog/auth-role-dialog.component';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    RouterLinkActive,
    NgFor,
    DatePipe,
    AsyncPipe,
    ButtonHoverColorDirective,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private readonly dialog = inject(MatDialog);
  public readonly authService = inject(AuthService);
  readonly headerItem1 = 'Главная';
  readonly headerItem2 = 'О компании';
  readonly headerItem3 = 'Каталог';

  today$: Observable<Date> = timer(0, 1000).pipe(map(() => new Date()));

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

  public openDialog(): void {
    const dialogRef = this.dialog.open(AuthRoleDialogComponent, {
      width: '400px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'admin') {
        this.authService.loginAsAdmin();
      } else if (result === 'user') {
        this.authService.loginAsUser();
      } else return undefined;
    });
  }

  public logOut() {
    this.authService.logout();
  }
}
