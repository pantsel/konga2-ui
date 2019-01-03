import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from '@app/user/user-list/user-list.component';
import {UserUpdateComponent} from '@app/user/user-update/user-update.component';
import {UserComponent} from '@app/user/user.component';
import {UserDetailsComponent} from '@app/user/user-details/user-details.component';
import {UserSecurityComponent} from '@app/user/user-security/user-security.component';
import {UserPermissionsComponent} from '@app/user/user-permissions/user-permissions.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    pathMatch: 'full',
    data: { title: 'konga.menu.users' }
  },
  {
    path: ':id',
    component: UserComponent,
    data: { title: 'konga.menu.users.update' },
    children: [
      {path: '', redirectTo: 'details', outlet: 'user'},
      {path: 'details', component: UserDetailsComponent, outlet: 'user'},
      {path: 'security', component: UserSecurityComponent, outlet: 'user'},
      {path: 'permissions', component: UserPermissionsComponent, outlet: 'user'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
