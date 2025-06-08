import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../intefaces/todos.interface';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private readonly todosSubject$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  readonly todos$: Observable<Todo[]> = this.todosSubject$.asObservable();

  setTodos(todos: Todo[]): void {
    this.todosSubject$.next(todos);
  }

  editTodo(editedTodo: Todo): void {
    this.todosSubject$.next(
      this.todosSubject$.value.map((todo: Todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      )
    );
  }

  createTodo(todo: Todo): void {
    const existingTodo = this.todosSubject$.value.find(
      (currentElement: Todo) => currentElement.title === todo.title
    );
    
    if (existingTodo !== undefined) {
      alert("Todo is already exist");
    } else {
      this.todosSubject$.next([...this.todosSubject$.value, todo]);
      alert ("Todo is created");
    }
  }

  deleteTodo(id: number) {
    this.todosSubject$.next(
      this.todosSubject$.value.filter((todo: Todo) => todo.id !== id)
    );
  }
}
