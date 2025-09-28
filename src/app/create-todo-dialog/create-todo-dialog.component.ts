import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
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
import { Todo } from '../interfaces/todos.interface';

@Component({
  selector: 'app-create-todo-dialog',
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
  templateUrl: './create-todo-dialog.component.html',
  styleUrl: './create-todo-dialog.component.scss',
})
export class CreateTodoDialogComponent {
  readonly data = inject<{ todo: Todo }>(MAT_DIALOG_DATA);

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
