import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../intefaces/todos.interface';
import { SnackbarService } from '../snackbar.service';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private readonly todosSubject$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  private snackBarService = inject(SnackbarService);

  readonly todos$: Observable<Todo[]> = this.todosSubject$.asObservable();

  setTodos(todos: Todo[]): void {
    this.todosSubject$.next(todos.slice(0, 12));
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
    if (existingTodo) {
      this.snackBarService.showSnack('THIS TODO ALREADY EXISTS');
    } else {
      this.todosSubject$.next([...this.todosSubject$.value, todo]),
        this.snackBarService.showSnack('TODO IS CREATED');
    }
  }

  deleteTodo(id: number) {
    this.todosSubject$.next(
      this.todosSubject$.value.filter((todo: Todo) => todo.id !== id)
    );
  }
}
