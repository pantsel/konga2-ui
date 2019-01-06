import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionsComponent } from './connections.component';
import {SharedModule} from '@app/shared';
import {ConnectionsRoutingModule} from '@app/connections/connetions-routing.module';
import { ConnectionsCreateComponent } from './connections-create/connections-create.component';
import {ConnectionsService} from '@app/connections/connections.service';

@NgModule({
  entryComponents: [ConnectionsCreateComponent],
  declarations: [ConnectionsComponent, ConnectionsCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConnectionsRoutingModule
  ],
  providers: [ConnectionsService]
})
export class ConnectionsModule { }
