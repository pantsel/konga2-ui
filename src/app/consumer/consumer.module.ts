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
import { ConsumerBasicAuthComponent } from './consumer-basic-auth/consumer-basic-auth.component';
import { ConsumerKeyAuthComponent } from './consumer-key-auth/consumer-key-auth.component';
import { ConsumerHmacAuthComponent } from './consumer-hmac-auth/consumer-hmac-auth.component';
import { ConsumerOauth2Component } from './consumer-oauth2/consumer-oauth2.component';
import { ConsumerJwtComponent } from './consumer-jwt/consumer-jwt.component';

@NgModule({
  declarations: [ConsumerComponent, ConsumerListComponent, ConsumerDetailsComponent, ConsumerGroupsComponent, ConsumerCredentialsComponent, ConsumerPluginsComponent, ConsumerBasicAuthComponent, ConsumerKeyAuthComponent, ConsumerHmacAuthComponent, ConsumerOauth2Component, ConsumerJwtComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConsumerRoutingModule
  ]
})
export class ConsumerModule { }
