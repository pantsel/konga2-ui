import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@app/shared';
import {RouteRoutingModule} from '@app/route/route-routing.module';
import {RouteComponent} from '@app/route/route.component';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { RoutePluginsComponent } from './route-plugins/route-plugins.component';
import { RouteConsumersComponent } from './route-consumers/route-consumers.component';

@NgModule({
  declarations: [RouteComponent, RouteDetailsComponent, RoutePluginsComponent, RouteConsumersComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouteRoutingModule
  ]
})
export class RouteModule { }
