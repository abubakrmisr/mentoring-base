import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../intefaces/users.interface';
import { SnackbarService } from '../snackbar.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private snackBarService = inject(SnackbarService);

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

  createUser(user: User): void {
    const existingUser = this.usersSubject$.value.find(
      (currentElement: User) => currentElement.email === user.email
    );
    if (existingUser) {
      this.snackBarService.showSnack('THIS USER ALREADY EXISTS');
    } else {
      this.usersSubject$.next([...this.usersSubject$.value, user]),
        this.snackBarService.showSnack('USER IS CREATED');
    }
  }

  deleteUser(id: number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((user: User) => user.id !== id)
    );
  }
}
