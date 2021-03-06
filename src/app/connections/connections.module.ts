import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionsComponent } from './connections.component';
import {SharedModule} from '@app/shared';
import { ConnectionsCreateComponent } from './connections-create/connections-create.component';
import { ConnectionFormComponent } from './connection-form/connection-form.component';
import {ConnectionsRoutingModule} from '@app/connections/connections-routing.module';

@NgModule({
  entryComponents: [ConnectionsCreateComponent],
  declarations: [ConnectionsComponent, ConnectionsCreateComponent, ConnectionFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConnectionsRoutingModule
  ],
  providers: [],
  exports: [ConnectionFormComponent]
})
export class ConnectionsModule { }
