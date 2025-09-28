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
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-creat-user-dialog-launcher',
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
  templateUrl: './creat-user-dialog-launcher.component.html',
  styleUrls: ['./creat-user-dialog-launcher.component.scss'],
})
export class CreatUserFormComponent {
  @Output()
  createUser = new EventEmitter<CreateEditUser>();

  @Input()
  user!: User;

  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);
  private snackBarService = inject(SnackbarService);

  openDialog(): void {
    this.dialog
      .open(CreateUserDialogComponent)
      .afterClosed()
      .subscribe((editResult: CreateEditUser) => {
        if (editResult) {
          this.snackBarService.showSnack('USER IS CREATED'),
            this.createUser.emit(editResult);
        } else {
          this.snackBarService.showSnack('USER IS NOT CREATED');
        }
      });
  }
}
