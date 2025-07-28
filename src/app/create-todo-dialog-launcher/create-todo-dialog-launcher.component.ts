import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../intefaces/todos.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateTodoDialogComponent } from '../create-todo-dialog/create-todo-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../snackbar.service';

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
  private snackBarService = inject(SnackbarService);

  openDialog(): void {
    this.dialog
      .open(CreateTodoDialogComponent)
      .afterClosed()
      .subscribe((editResult: Todo) => {
        if (editResult) {
          this.snackBarService.showSnack('TODO IS CREATED'),
          this.createTodo.emit(editResult);
        } else {
          this.snackBarService.showSnack('TODO IS NOT CREATED');
        }
      });
  }
}
