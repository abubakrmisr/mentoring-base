import { Component } from '@angular/core';
import { MatDialogClose } from '@angular/material/dialog';
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
  selector: 'app-create-todo-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './create-todo-dialog.component.html',
  styleUrl: './create-todo-dialog.component.scss',
})
export class CreateTodoDialogComponent {
  public form = new FormGroup({
    id: new FormControl<number>(new Date().getTime(), {
      nonNullable: true,
      validators: [Validators.minLength(3), Validators.required],
    }),
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(3), Validators.required],
    }),
    userId: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.min(1), Validators.required],
    }),
    completed: new FormControl<boolean>(false, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}
