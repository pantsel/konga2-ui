import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserUpdateComponent} from '@app/user/user-update/user-update.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {AuthGuardService} from '@app/core';
import {ServiceListComponent} from '@app/service/service-list/service-list.component';
import {ServiceComponent} from '@app/service/service.component';
import {UserDetailsComponent} from '@app/user/user-details/user-details.component';
import {UserSecurityComponent} from '@app/user/user-security/user-security.component';
import {UserPermissionsComponent} from '@app/user/user-permissions/user-permissions.component';
import {ServiceDetailsComponent} from '@app/service/service-details/service-details.component';
import {ServiceRoutesComponent} from '@app/service/service-routes/service-routes.component';
import {ServicePluginsComponent} from '@app/service/service-plugins/service-plugins.component';
import {ServiceConsumersComponent} from '@app/service/service-consumers/service-consumers.component';


const routes: Routes = [
  {
    path: '',
    component: ServiceListComponent,
    canActivate: [AuthGuardService, NgxPermissionsGuard],
    data: {
      title: 'konga.menu.services',
      permissions: {
        only : ['superAdmin', 'servicesList']
      }
    }
  },
  {
    path: ':id',
    component: ServiceComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'konga.menu.service',
      permissions: {
        only : ['superAdmin', 'servicesUpdate']
      }
    },
    children: [
      {path: '', redirectTo: 'details', outlet: 'service'},
      {path: 'details', component: ServiceDetailsComponent, outlet: 'service'},
      {path: 'routes', component: ServiceRoutesComponent, outlet: 'service'},
      {path: 'plugins', component: ServicePluginsComponent, outlet: 'service'},
      {path: 'consumers', component: ServiceConsumersComponent, outlet: 'service'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule {

}
