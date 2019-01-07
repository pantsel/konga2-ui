import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from '@app/dashboard/dashboard-routing.module';
import {SharedModule} from '@app/shared';
import {ConnectionsModule} from '@app/connections/connections.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ConnectionsModule
  ]
})
export class DashboardModule { }
