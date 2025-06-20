import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../intefaces/todos.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss',
})
export class CreateTodoFormComponent {
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

  @Output()
  createTodo = new EventEmitter<Todo>();

  public submitForm(): void {
    const rawValue: Todo = this.form.getRawValue();
    // const userIdValue: number = rawValue.userId ?? 0;
    // const completedValue: boolean = rawValue.completed ?? false;
    const todo: Todo = {
      id: rawValue.id,
      title: rawValue.title,
      userId: rawValue.userId,
      completed: rawValue.completed,
    };

    this.createTodo.emit(todo);
    this.form.reset();
  }
}
