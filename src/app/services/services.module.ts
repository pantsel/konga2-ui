import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import {SharedModule} from '@app/shared';
import {ServicesRoutingModule} from '@app/services/services-routing.module';

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    SharedModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
