import { createReducer, on } from '@ngrx/store';
import { User } from '../../interfaces/users.interface';
import { UsersActions } from './users.actions';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(UsersActions.set, (state, { users }) => ({
    ...state,
    users,
  })),

  on(UsersActions.edit, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  })),

  on(UsersActions.create, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(UsersActions.delete, (state, { id }) => ({
      ...state,
      users: state.users.filter((user) => user.id !== id),
    })
  )
);
