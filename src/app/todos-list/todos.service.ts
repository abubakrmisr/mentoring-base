import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../intefaces/todos.interface';

@Injectable({ providedIn: 'root' })
export class TodosService {
  todosSubject$ = new BehaviorSubject<Todo[]>([]);

  todos$: Observable<Todo[]> = this.todosSubject$;

  setTodos(todos: Todo[]): void {
    this.todosSubject$.next(todos);
  }

  editTodo(editedTodo: Todo) {
    this.todosSubject$.next(
      this.todosSubject$.value.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      )
    );
  }

  createTodo(todo: Todo) {
    this.todosSubject$.next([...this.todosSubject$.value, todo]);
  }

  deleteTodo(id: number) {
    this.todosSubject$.next(
      this.todosSubject$.value.filter((todo: Todo) => todo.id !== id)
    );
  }
}
