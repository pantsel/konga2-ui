import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import {SharedModule} from '@app/shared';
import {RouterModule} from '@angular/router';
import {ConnectionsService} from '@app/connections/connections.service';
import { ConnectionChooserComponent } from './connection-chooser/connection-chooser.component';

@NgModule({
  declarations: [FooterComponent, ConnectionChooserComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  providers: [ConnectionsService],
  exports: [FooterComponent]
})
export class FooterModule { }
