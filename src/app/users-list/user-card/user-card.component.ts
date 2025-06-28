import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CreateUser, User } from '../../intefaces/users.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
})
export class UserCardComponent {
  @Input()
  user!: User;

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<CreateUser>();

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog
      .open(EditUserDialogComponent, {
        data: { user: this.user },
      })
      .afterClosed()
      .subscribe((editResult: CreateUser) => {
        if (editResult) {
          this.editUser.emit(editResult);
        }
      });
  }

  onDeleteUser(userId: number) {
    this.deleteUser.emit(userId);
  }
}
