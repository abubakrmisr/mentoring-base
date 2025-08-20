import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { HomeContentComponent } from './app-home-content.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'todos',
    component: TodosListComponent,
  },
  {
    path: '',
    component: HomeContentComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
  },
];
