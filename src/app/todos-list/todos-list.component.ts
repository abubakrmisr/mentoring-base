import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from './todos-api.service';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodosService } from './todos.service';
import { Todo } from '../intefaces/todos.interface';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);
  readonly todosService = inject(TodosService);
  todos = this.todosService.todos;
  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.todosService.setTodos(response);
    });
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }
}
