import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../interfaces/todos.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateTodoDialogComponent } from '../create-todo-dialog/create-todo-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss',
})
export class CreateTodoFormComponent {
  @Output()
  createTodo = new EventEmitter<Todo>();

  @Input()
  todo!: Todo;

  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  openDialog(): void {
    this.dialog
      .open(CreateTodoDialogComponent, {
        data: { user: this.todo },
      })
      .afterClosed()
      .subscribe((editResult: Todo) => {
        if (editResult !== undefined) {
          this.snackBar.open('TODO IS CREATED', 'OK', {
            duration: 3000,
          });
          this.createTodo.emit(editResult);
        } else {
          this.snackBar.open('TODO IS NOT CREATED', 'OK', {
            duration: 3000,
          });
        }
      });
  }
}
