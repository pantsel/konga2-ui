import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '@app/core';
import {NgModule} from '@angular/core';
import {RouteComponent} from '@app/route/route.component';
import {RouteDetailsComponent} from '@app/route/route-details/route-details.component';
import {RoutePluginsComponent} from '@app/route/route-plugins/route-plugins.component';
import {RouteConsumersComponent} from '@app/route/route-consumers/route-consumers.component';

const routes: Routes = [
  {
    path: ':id',
    component: RouteComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'konga.menu.service',
      permissions: {
        only : ['superAdmin', 'routesUpdate']
      }
    },
    children: [
      {path: '', redirectTo: 'details', outlet: 'route'},
      {path: 'details', component: RouteDetailsComponent, outlet: 'route'},
      {path: 'plugins', component: RoutePluginsComponent, outlet: 'route'},
      {path: 'consumers', component: RouteConsumersComponent, outlet: 'route'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule {

}
