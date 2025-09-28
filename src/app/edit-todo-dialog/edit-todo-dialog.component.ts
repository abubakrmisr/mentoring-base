import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../interfaces/todos.interface';

@Component({
  selector: 'app-edit-todo-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './edit-todo-dialog.component.html',
  styleUrl: './edit-todo-dialog.component.scss',
})
export class EditTodoDialogComponent {
  readonly data = inject<{ todo: Todo }>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    id: new FormControl<number>(this.data.todo.id, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    title: new FormControl<string>(this.data.todo.title, {
      nonNullable: true,
      validators: [Validators.minLength(3), Validators.required],
    }),
    userId: new FormControl<number>(this.data.todo.userId, {
      nonNullable: true,
      validators: [Validators.min(1), Validators.required],
    }),
    completed: new FormControl<boolean>(this.data.todo.completed, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}
