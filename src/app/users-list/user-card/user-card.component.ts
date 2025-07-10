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

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input()
  user!: User;

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<CreateEditUser>();

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog
      .open(EditUserDialogComponent, {
        data: { user: this.user },
      })
      .afterClosed()
      .subscribe((editResult: CreateEditUser) => {
        if (editResult) {
          this.editUser.emit(editResult);
        }
      });
  }

  openDeleteDialog(): void {
    this.dialog
      .open(DeleteUserDialogComponent, {
        data: { user: this.user },
      })
      .afterClosed()
      .subscribe((userId: number) => {
        if (userId !== undefined) {
          console.log(`User with ID: ${userId} has been deleted`);
          this.deleteUser.emit(userId);
        }
      });
  }
}
