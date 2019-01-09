import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserUpdateComponent} from '@app/user/user-update/user-update.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {AuthGuardService} from '@app/core';
import {ServicesComponent} from '@app/services/services.component';


const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    canActivate: [AuthGuardService, NgxPermissionsGuard],
    data: {
      title: 'konga.menu.services',
      permissions: {
        only : ['superAdmin', 'servicesList']
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule {

}