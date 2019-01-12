import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerComponent } from './consumer.component';
import { ConsumerListComponent } from './consumer-list/consumer-list.component';
import {SharedModule} from '@app/shared';
import {ConsumerRoutingModule} from '@app/consumer/consumer-routing.module';
import { ConsumerDetailsComponent } from './consumer-details/consumer-details.component';
import { ConsumerGroupsComponent } from './consumer-groups/consumer-groups.component';
import { ConsumerCredentialsComponent } from './consumer-credentials/consumer-credentials.component';
import { ConsumerPluginsComponent } from './consumer-plugins/consumer-plugins.component';

@NgModule({
  declarations: [ConsumerComponent, ConsumerListComponent, ConsumerDetailsComponent, ConsumerGroupsComponent, ConsumerCredentialsComponent, ConsumerPluginsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConsumerRoutingModule
  ]
})
export class ConsumerModule { }
