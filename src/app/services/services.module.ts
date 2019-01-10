import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import {SharedModule} from '@app/shared';
import {ServicesRoutingModule} from '@app/services/services-routing.module';
import { ServicesCreateComponent } from './services-create/services-create.component';

@NgModule({
  entryComponents: [ServicesCreateComponent],
  declarations: [ServicesComponent, ServicesCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
