import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../intefaces/todos.interface';

@Injectable({ providedIn: 'root' })
export class TodosService {
  todosSubject$ = new BehaviorSubject(<Todo[]>[]);
  todos: Todo[] = [];

  setTodos(todos: Todo[]): void {
    this.todosSubject$.next(todos);
  }

  editTodo(editedTodo: Todo) {
    this.todosSubject$.next(
      this.todosSubject$.value.map((user) => {
        if (user.id === editedTodo.id) {
          return editedTodo;
        } else {
          return user;
        }
      })
    );
  }

  createTodo(todo: Todo) {
    this.todosSubject$.next([...this.todosSubject$.value, todo]);
  }

  deleteTodo(id: number) {
    this.todosSubject$.next(
      this.todosSubject$.value.filter((item) => {
        if (id === item.id) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
