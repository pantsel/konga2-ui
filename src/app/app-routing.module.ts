import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';
import {AuthGuardService} from '@app/core';
import {NgxPermissionsGuard} from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    canActivate: [NgxPermissionsGuard],
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
    path: 'users',
    loadChildren: 'app/user/user.module#UserModule',
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
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
