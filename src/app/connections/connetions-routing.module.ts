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
import {AppState, AuthGuardService, selectAuth} from '@app/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ConnectionsComponent} from '@app/connections/connections.component';


const routes: Routes = [
  {
    path: '',
    component: ConnectionsComponent,
    canActivate: [AuthGuardService, NgxPermissionsGuard],
    data: {
      title: 'konga.menu.connections',
      permissions: {
        only : ['superAdmin', 'connectionsList']
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionsRoutingModule {

}
