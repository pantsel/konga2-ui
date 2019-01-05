import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {UserListComponent} from '@app/user/user-list/user-list.component';
import {UserUpdateComponent} from '@app/user/user-update/user-update.component';
import {UserComponent} from '@app/user/user.component';
import {UserDetailsComponent} from '@app/user/user-details/user-details.component';
import {UserSecurityComponent} from '@app/user/user-security/user-security.component';
import {UserPermissionsComponent} from '@app/user/user-permissions/user-permissions.component';
import {UserCreateComponent} from '@app/user/user-create/user-create.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {AppState, selectAuth} from '@app/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

let auth$: Observable<any>;
let authUser: any;

export const onlyMe = (route: Route) => {
  return (+authUser.id === +route['params'].id) ? true : ['superAdmin', 'usersUpdate']
}

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    pathMatch: 'full',
    canActivate: [NgxPermissionsGuard],
    data: {
      title: 'konga.menu.users',
      permissions: {
        only : ['superAdmin', 'usersList']
      }
    }
  },
  {
    path: 'create',
    component: UserCreateComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      title: 'konga.menu.users_create',
      permissions: {
        only : ['superAdmin', 'usersCreate']
      }
    }
  },
  {
    path: ':id',
    component: UserComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      title: 'konga.menu.users.update',
      permissions: {
        only : onlyMe
      }
    },
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
export class UserRoutingModule {
  constructor(private store: Store<AppState>) {
    auth$ = this.store.pipe(select(selectAuth));
    auth$.subscribe(auth => {
      if (auth.isAuthenticated) authUser = auth.user;
    })
  }
}
