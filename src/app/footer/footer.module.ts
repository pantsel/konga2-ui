import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import {SharedModule} from '@app/shared';
import {RouterModule} from '@angular/router';
import {ConnectionsService} from '@app/connections/connections.service';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  providers: [ConnectionsService],
  exports: [FooterComponent]
})
export class FooterModule { }
