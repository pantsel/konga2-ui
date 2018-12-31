import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { LoginComponent } from '@app/entry/login/login.component';
import Signals = NodeJS.Signals;
import { SignUpComponent } from '@app/entry/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'konga.menu.login' }
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: { title: 'konga.menu.signup' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule {}
