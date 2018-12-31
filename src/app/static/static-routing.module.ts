import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { AuthGuardService } from '@app/core';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuardService],
    data: { title: 'konga.menu.about' }
  },
  {
    path: 'features',
    component: FeaturesComponent,
    data: { title: 'konga.menu.features' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
