import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../intefaces/todos.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateTodoDialogComponent } from '../create-todo-dialog/create-todo-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-todo-dialog-launcher',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './create-todo-dialog-launcher.component.html',
  styleUrl: './create-todo-dialog-launcher.component.scss',
})
export class CreateTodoFormComponent {
  @Output()
  createTodo = new EventEmitter<Todo>();

  @Input()
  todo!: Todo;

  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  showSnack(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'OK', { duration });
  }

  openDialog(): void {
    this.dialog
      .open(CreateTodoDialogComponent, {
        data: { todo: this.todo },
      })
      .afterClosed()
      .subscribe((editResult: Todo) => {
        editResult
          ? (this.showSnack('TODO IS CREATED'),
            this.createTodo.emit(editResult))
          : this.showSnack('TODO IS NOT CREATED');
      });
  }
}