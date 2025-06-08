import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf ],
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss'
})
export class CreateTodoFormComponent {
  public form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userId: new FormControl('', [Validators.required, Validators.minLength(1)]),
    completed: new FormControl('', [Validators.required, Validators.minLength(2)])
  })
  
  @Output()
    createTodo = new EventEmitter();

  public submitForm(): void {
    this.createTodo.emit(this.form.value);
    this.form.reset();
  }
  
}
