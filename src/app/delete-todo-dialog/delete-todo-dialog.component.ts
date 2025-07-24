import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Todo } from '../intefaces/todos.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-todo-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './delete-todo-dialog.component.html',
  styleUrl: './delete-todo-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteTodoDialogComponent {
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject<{ todo: Todo }>(MAT_DIALOG_DATA);
}
