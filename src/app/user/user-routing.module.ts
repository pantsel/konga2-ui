import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from '@app/user/user-list/user-list.component';
import {UserUpdateComponent} from '@app/user/user-update/user-update.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    pathMatch: 'full',
    data: { title: 'konga.menu.users' }
  },
  {
    path: ':id',
    component: UserUpdateComponent,
    pathMatch: 'full',
    data: { title: 'konga.menu.users.update' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
