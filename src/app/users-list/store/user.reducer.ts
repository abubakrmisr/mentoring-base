import { createReducer, on } from '@ngrx/store';
import { User } from '../../intefaces/users.interface';
import { UsersActions } from './users.actions';

const initialState: { users: User[] } = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(UsersActions.set, (state: { users: User[] }, { users }) => ({
    ...state,
    users: users,
  })),

  on(UsersActions.edit, (state: { users: User[] }, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  })),

  on(UsersActions.create, (state: { users: User[] }, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(UsersActions.delete, (state: { users: User[] }, { id }: { id: number }) => ({
      ...state,
      users: state.users.filter((user) => user.id !== id),
    })
  )
);
