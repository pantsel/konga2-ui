import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserUpdateComponent} from '@app/user/user-update/user-update.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {AuthGuardService} from '@app/core';
import {ServiceListComponent} from '@app/service/service-list/service-list.component';
import {ServiceComponent} from '@app/service/service.component';
import {ServiceDetailsComponent} from '@app/service/service-details/service-details.component';
import {ServiceRoutesComponent} from '@app/service/service-routes/service-routes.component';
import {ServicePluginsComponent} from '@app/service/service-plugins/service-plugins.component';
import {ServiceConsumersComponent} from '@app/service/service-consumers/service-consumers.component';
import {ConsumerListComponent} from '@app/consumer/consumer-list/consumer-list.component';
import {ConsumerComponent} from '@app/consumer/consumer.component';
import {ConsumerDetailsComponent} from '@app/consumer/consumer-details/consumer-details.component';
import {ConsumerGroupsComponent} from '@app/consumer/consumer-groups/consumer-groups.component';
import {ConsumerCredentialsComponent} from '@app/consumer/consumer-credentials/consumer-credentials.component';
import {ConsumerPluginsComponent} from '@app/consumer/consumer-plugins/consumer-plugins.component';


const routes: Routes = [
  {
    path: '',
    component: ConsumerListComponent,
    canActivate: [AuthGuardService, NgxPermissionsGuard],
    data: {
      title: 'konga.menu.consumers',
      permissions: {
        only : ['superAdmin', 'consumersList']
      }
    }
  },
  {
    path: ':id',
    component: ConsumerComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'konga.menu.consumer',
      permissions: {
        only : ['superAdmin', 'consumersUpdate']
      }
    },
    children: [
      {path: '', redirectTo: 'details', outlet: 'consumer'},
      {path: 'details', component: ConsumerDetailsComponent, outlet: 'consumer'},
      {path: 'groups', component: ConsumerGroupsComponent, outlet: 'consumer'},
      {path: 'credentials', component: ConsumerCredentialsComponent, outlet: 'consumer'},
      {path: 'plugins', component: ConsumerPluginsComponent, outlet: 'consumer'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerRoutingModule {

}
