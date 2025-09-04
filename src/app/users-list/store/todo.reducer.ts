import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
import { Todo } from '../../intefaces/todos.interface';
import { TodosActions } from './todos.actions';

const initialState: { todos: Todo[] } = {
  todos: [],
};

export const todoReducer = createReducer(
  initialState,
  on(TodosActions.set, (state: { todos: Todo[] }, { todos }) => ({
    ...state,
    todos: todos,
  })),

  on(TodosActions.edit, (state: { todos: Todo[] }, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
  })),

  on(TodosActions.create, (state: { todos: Todo[] }, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),

  on(TodosActions.delete, (state: { todos: Todo[] }, { id }: { id: number }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    })
  )
);
