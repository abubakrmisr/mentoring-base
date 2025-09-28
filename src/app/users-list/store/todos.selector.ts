import { state } from "@angular/animations";
import { Todo } from "../../interfaces/todos.interface";
import { createSelector } from "@ngrx/store";

interface TodoState {
    todos: Todo[];
}

interface AppState {
    todos: TodoState;
}

export const selectTodosFeature = (state: AppState) => state.todos;

export const selectTodos = createSelector(
    selectTodosFeature,
    (state: TodoState) => state.todos
);