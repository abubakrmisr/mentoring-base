import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Todo } from '../../intefaces/todos.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../../edit-todo-dialog/edit-todo-dialog.component';
import { DeleteTodoDialogComponent } from '../../delete-todo-dialog/delete-todo-dialog.component';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../snackbar.service';
import { TextCutterPipe } from "../../text-cutter.pipe";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    TextCutterPipe
],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  @Input()
  todo!: Todo;

  @Output()
  deleteTodo = new EventEmitter<number>();

  @Output()
  editTodo = new EventEmitter<Todo>();

  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);
  private snackBarService = inject(SnackbarService);

  openDialog(): void {
    this.dialog
      .open(EditTodoDialogComponent, {
        data: { todo: this.todo },
      })
      .afterClosed()
      .subscribe((editResult: Todo) => {
        if (editResult) {
          this.snackBarService.showSnack('TODO IS EDITED'),
            this.editTodo.emit(editResult);
        } else {
          this.snackBarService.showSnack('TODO IS NOT EDITED');
        }
      });
  }

  openDeleteDialog(): void {
    this.dialog
      .open(DeleteTodoDialogComponent, {
        data: { todo: this.todo },
      })
      .afterClosed()
      .subscribe((todoId: number) => {
        if (todoId) {
          this.snackBarService.showSnack('TODO IS DELETED'),
            this.deleteTodo.emit(todoId);
        } else {
          this.snackBarService.showSnack('TODO IS NOT DELETED');
        }
      });
  }
}
