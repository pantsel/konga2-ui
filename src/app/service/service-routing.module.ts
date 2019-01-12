import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserUpdateComponent} from '@app/user/user-update/user-update.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {AuthGuardService} from '@app/core';
import {ServiceListComponent} from '@app/service/service-list/service-list.component';
import {ServiceComponent} from '@app/service/service.component';


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
      title: 'konga.menu.services_view',
      permissions: {
        only : ['superAdmin']
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule {

}
