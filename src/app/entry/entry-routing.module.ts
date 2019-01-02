import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/entry/login/login.component';
import { SignUpComponent } from '@app/entry/sign-up/sign-up.component';
import {WelcomeComponent} from '@app/entry/welcome/welcome.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'konga.menu.login' }
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { title: 'konga.menu.welcome' }
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
