import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from './todos-api.service';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodosService } from './todos.service';
import { Todo } from '../intefaces/todos.interface';
import { Observable } from 'rxjs';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';

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
  private readonly todosService = inject(TodosService);

  readonly todos$: Observable<Todo[]> = this.todosService.todos$;
  
  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.todosService.setTodos(response);
    });
  }
  
  public createTodo(FormData: Todo) {
    this.todosService.createTodo({
      id: new Date().getTime(),
      title: FormData.title,
      userId: FormData.userId,
      completed: FormData.completed
    });
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }
}
