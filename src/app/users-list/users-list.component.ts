import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { User, CreateEditUser } from '../intefaces/users.interface';
import { CreatUserFormComponent } from '../creat-user-dialog-launcher/creat-user-dialog-launcher.component';
import { select, Store } from '@ngrx/store';
import { UsersActions } from './store/users.actions';
import { selectUsers } from './store/users.selectors';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, CreatUserFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);

  constructor() {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.store.dispatch(UsersActions.set({ users: response }));
    });
  }

  createUser(formData: CreateEditUser) {
    this.store.dispatch(
      UsersActions.create({
        user: {
          id: new Date().getTime(),
          name: formData.name,
          email: formData.email,
          website: formData.website,
          phone: formData.phone,
          company: {
            name: formData.companyName,
          },
        },
      })
    );
  }

  deleteUser(id: number) {
    this.store.dispatch(UsersActions.delete({ id }));
  }

  public editUser(formData: CreateEditUser) {
    this.store.dispatch(
      UsersActions.edit({
        user: {
          id: formData.id,
          name: formData.name,
          email: formData.email,
          website: formData.website,
          phone: formData.phone,
          company: {
            name: formData.companyName,
          },
        },
      })
    );
  }
}
