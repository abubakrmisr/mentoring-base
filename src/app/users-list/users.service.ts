import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../intefaces/users.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );

  users$: Observable<User[]> = this.usersSubject$.asObservable();

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

  createUser(user: User): boolean {
    const existingUser = this.usersSubject$.value.find(
      (currentElement: User) => currentElement.email === user.email
    );
    return existingUser
      ? false
      : (this.usersSubject$.next([...this.usersSubject$.value, user]), true);
  }

  deleteUser(id: number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((user: User) => user.id !== id)
    );
  }
}
