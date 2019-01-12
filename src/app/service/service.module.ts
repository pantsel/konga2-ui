import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@app/shared';
import { ServiceListComponent } from './service-list/service-list.component';
import {ServiceCreateComponent} from '@app/service/service-create/service-create.component';
import {ServiceComponent} from '@app/service/service.component';
import {ServiceRoutingModule} from '@app/service/service-routing.module';

@NgModule({
  entryComponents: [ServiceCreateComponent],
  declarations: [ServiceComponent, ServiceCreateComponent, ServiceListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ServiceRoutingModule
  ]
})
export class ServiceModule { }
