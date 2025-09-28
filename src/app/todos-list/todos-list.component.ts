import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from './todos-api.service';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { Todo } from '../interfaces/todos.interface';
import { CreateTodoFormComponent } from '../create-todo-dialog-launcher/create-todo-dialog-launcher.component';
import { Store } from '@ngrx/store';
import { TodosActions } from '../users-list/store/todos.actions';
import { selectTodos } from '../users-list/store/todos.selector';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);

  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.store.dispatch(TodosActions.set({ todos: response }));
    });
  }

  public createTodo(FormData: Todo) {
    this.store.dispatch(
      TodosActions.create({
        todo: {
        id: new Date().getTime(),
        title: FormData.title,
        userId: FormData.userId,
        completed: FormData.completed
        }
      })
    );
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodosActions.delete({ id }));
  }

  public editTodo(todo: Todo) {
    this.store.dispatch(TodosActions.edit({ todo }));
  }
}
