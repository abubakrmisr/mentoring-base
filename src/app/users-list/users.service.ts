import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../intefaces/users.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  usersSubject$ = new BehaviorSubject<User[]>([]);

  users$: Observable<User[]> = this.usersSubject$;

  setUsers(users: User[]): void {
    this.usersSubject$.next(users);
  }

  editUser(editedUser: User) {
    this.usersSubject$.next(
      this.usersSubject$.value.map((user: User) =>
        user.id === editedUser.id ? editedUser : user
      )
    );
  }

  createUser(user: User): void {
    this.usersSubject$.next([...this.usersSubject$.value, user]);
  }

  deleteUser(id: number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((user: User) => user.id !== id)
    );
  }
}
