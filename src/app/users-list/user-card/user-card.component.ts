import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CreateEditUser, User } from '../../intefaces/users.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../../delete-user-dialog/delete-user-dialog.component';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class UserCardComponent {
  @Input()
  user!: User;

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<CreateEditUser>();

  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  showSnack(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'OK', { duration });
  }

  openDialog(): void {
    this.dialog
      .open(EditUserDialogComponent, {
        data: { user: this.user },
      })
      .afterClosed()
      .subscribe((editResult: CreateEditUser) => {
        editResult
          ? (this.showSnack('USER IS EDITED'), this.editUser.emit(editResult))
          : this.showSnack('USER IS NOT EDITED');
      });
  }

  openDeleteDialog(): void {
    this.dialog
      .open(DeleteUserDialogComponent, {
        data: { user: this.user },
      })
      .afterClosed()
      .subscribe((userId: number) => {
        userId
          ? (this.showSnack('USER IS DELETED'),
            this.deleteUser.emit(userId))
          : this.showSnack('USER IS NOT DELETED');
      });
  }
}
