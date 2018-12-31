import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'konga.menu.settings' }
  },
  {
    path: 'examples',
    loadChildren: 'app/examples/examples.module#ExamplesModule'
  },
  {
    path: 'entry',
    loadChildren: 'app/entry/entry.module#EntryModule'
  },
  {
    path: '**',
    redirectTo: 'login'
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
