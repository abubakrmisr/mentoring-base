import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersService } from './users.service';
import { User } from '../intefaces/users.interface';
import { Observable } from 'rxjs';
import { CreatUserFormComponent } from '../creat-user-form/creat-user-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, CreatUserFormComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  private readonly usersService = inject(UsersService);

  readonly users$: Observable<User[]> = this.usersService.users$;

  constructor() {
    this.usersApiService.getUsers().subscribe((response: readonly User[]) => {
      this.usersService.setUsers([...response]);
    });
  }
  
  createUser(formData: User){
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: {
        name: formData.company.name
      }
    });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }
}
