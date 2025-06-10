import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Todo_2 } from '../intefaces/todos.interface';

@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatButtonModule],
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss',
})
export class CreateTodoFormComponent {
  public form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    userId: new FormControl<number | null>(null, [
      Validators.required,
      Validators.minLength(1),
    ]),
    completed: new FormControl<boolean | null>(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  @Output()
  createTodo = new EventEmitter<Todo_2>();

  public submitForm(): void {
    if (this.form.valid) {
      this.createTodo.emit({
        id: new Date().getTime(),
        userId: this.form.value.userId!,
        title: this.form.value.title!,
        completed: this.form.value.completed!,
      });
      this.form.reset();
    }
  }
}
