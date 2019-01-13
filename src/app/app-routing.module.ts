import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';
import {AuthGuardService} from '@app/core';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {DashboardComponent} from '@app/dashboard/dashboard.component';
import {InfoComponent} from '@app/info/info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    canActivate: [AuthGuardService],
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'konga.menu.dashboard'
    }
  },
  {
    path: 'info',
    component: InfoComponent,
    canActivate: [AuthGuardService, NgxPermissionsGuard],
    data: {
      title: 'konga.menu.info',
      permissions: {
        only : ['superAdmin', 'infoRead']
      }
    }
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    canActivate: [AuthGuardService, NgxPermissionsGuard],
    data: {
      title: 'konga.menu.settings',
      permissions: {
        only : ['superAdmin', 'settingsUpdate']
      }
    }
  },
  {
    path: 'examples',
    loadChildren: 'app/examples/examples.module#ExamplesModule'
  },
  {
    path: 'services',
    loadChildren: 'app/service/service.module#ServiceModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'routes',
    loadChildren: 'app/route/route.module#RouteModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'consumers',
    loadChildren: 'app/consumer/consumer.module#ConsumerModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    loadChildren: 'app/user/user.module#UserModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'connections',
    loadChildren: 'app/connections/connections.module#ConnectionsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'entry',
    loadChildren: 'app/entry/entry.module#EntryModule'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
