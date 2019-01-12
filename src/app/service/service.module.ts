import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@app/shared';
import { ServiceListComponent } from './service-list/service-list.component';
import {ServiceCreateComponent} from '@app/service/service-create/service-create.component';
import {ServiceComponent} from '@app/service/service.component';
import {ServiceRoutingModule} from '@app/service/service-routing.module';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceRoutesComponent } from './service-routes/service-routes.component';
import { ServicePluginsComponent } from './service-plugins/service-plugins.component';
import { ServiceConsumersComponent } from './service-consumers/service-consumers.component';

@NgModule({
  entryComponents: [ServiceCreateComponent],
  declarations: [ServiceComponent, ServiceCreateComponent, ServiceListComponent, ServiceDetailsComponent, ServiceRoutesComponent, ServicePluginsComponent, ServiceConsumersComponent],
  imports: [
    CommonModule,
    SharedModule,
    ServiceRoutingModule
  ]
})
export class ServiceModule { }
