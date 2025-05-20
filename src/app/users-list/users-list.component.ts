import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersService } from './users.service';
import { User } from '../intefaces/users.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  private readonly usersService = inject(UsersService);

  users$: Observable<User[]> = this.usersService.users$;

  constructor() {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.usersService.setUsers(response);
    });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }
}
