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
import {ConsumerBasicAuthComponent} from '@app/consumer/consumer-basic-auth/consumer-basic-auth.component';
import {ConsumerKeyAuthComponent} from '@app/consumer/consumer-key-auth/consumer-key-auth.component';
import {ConsumerHmacAuthComponent} from '@app/consumer/consumer-hmac-auth/consumer-hmac-auth.component';
import {ConsumerOauth2Component} from '@app/consumer/consumer-oauth2/consumer-oauth2.component';
import {ConsumerJwtComponent} from '@app/consumer/consumer-jwt/consumer-jwt.component';
import {PluginListComponent} from '@app/plugin/plugin-list/plugin-list.component';


const routes: Routes = [
  {
    path: '',
    component: PluginListComponent,
    canActivate: [AuthGuardService, NgxPermissionsGuard],
    data: {
      title: 'konga.menu.plugins',
      permissions: {
        only : ['superAdmin', 'pluginsList']
      }
    }
  },
  // {
  //   path: ':id',
  //   component: ConsumerComponent,
  //   canActivate: [AuthGuardService],
  //   data: {
  //     title: 'konga.menu.consumer',
  //     permissions: {
  //       only : ['superAdmin', 'consumersUpdate']
  //     }
  //   },
  //   children: [
  //     {path: '', redirectTo: 'details', outlet: 'consumer'},
  //     {path: 'details', component: ConsumerDetailsComponent, outlet: 'consumer'},
  //     {path: 'groups', component: ConsumerGroupsComponent, outlet: 'consumer'},
  //     {
  //       path: 'credentials', component: ConsumerCredentialsComponent, outlet: 'consumer',
  //       children: [
  //         {path: '', redirectTo: 'basic-auth', outlet: 'credentials'},
  //         {path: 'basic-auth', component: ConsumerBasicAuthComponent, outlet: 'credentials'},
  //         {path: 'key-auth', component: ConsumerKeyAuthComponent, outlet: 'credentials'},
  //         {path: 'hmac-auth', component: ConsumerHmacAuthComponent, outlet: 'credentials'},
  //         {path: 'oauth2', component: ConsumerOauth2Component, outlet: 'credentials'},
  //         {path: 'jwt', component: ConsumerJwtComponent, outlet: 'credentials'},
  //       ]
  //     },
  //     {path: 'plugins', component: ConsumerPluginsComponent, outlet: 'consumer'},
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginRoutingModule {

}
