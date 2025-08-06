import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../intefaces/users.interface';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogClose,
    MatTooltipModule,
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
})
export class EditUserDialogComponent {
  readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    id: new FormControl<number>(this.data.user.id, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl(this.data.user.name, {
      nonNullable: true,
      validators: [Validators.minLength(2), Validators.required],
    }),
    email: new FormControl(this.data.user.email, {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    website: new FormControl(this.data.user.website, {
      nonNullable: true,
      validators: [Validators.minLength(3), Validators.required],
    }),

    phone: new FormControl(this.data.user.phone, {
      nonNullable: true,
      validators: [Validators.minLength(3), Validators.required],
    }),

    companyName: new FormControl(this.data.user.company.name, {
      nonNullable: true,
      validators: [Validators.minLength(2), Validators.required],
    }),
  });
}
