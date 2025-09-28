import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CreateEditUser, User } from '../interfaces/users.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creat-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './creat-user-form.component.html',
  styleUrls: ['./creat-user-form.component.scss'],
})
export class CreatUserFormComponent {
  @Output()
  createUser = new EventEmitter<CreateEditUser>();

  @Input()
  user!: User;

  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  openDialog(): void {
    this.dialog
      .open(CreateUserDialogComponent, {
        data: { user: this.user },
      })
      .afterClosed()
      .subscribe((editResult: CreateEditUser) => {
        if (editResult !== undefined) {
          this.snackBar.open('USER IS CREATED', 'OK', {
            duration: 3000,
          });
          this.createUser.emit(editResult);
        } else {
          this.snackBar.open('USER IS NOT CREATED', 'OK', {
            duration: 3000,
          });
        }
      });
  }
}
