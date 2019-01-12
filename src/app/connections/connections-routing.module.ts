import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserUpdateComponent} from '@app/user/user-update/user-update.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {AuthGuardService} from '@app/core';
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
