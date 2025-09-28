import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { User } from '../interfaces/users.interface';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatFormFieldModule,
  MatLabel,
  MatError,
} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss',
})
export class CreateUserDialogComponent {
  readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    id: new FormControl(new Date().getTime(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(2), Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    website: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(3), Validators.required],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(3), Validators.required],
    }),
    companyName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(2), Validators.required],
    }),
  });
}
