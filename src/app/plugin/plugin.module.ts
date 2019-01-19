import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginComponent } from './plugin.component';
import { PluginListComponent } from './plugin-list/plugin-list.component';
import {SharedModule} from '@app/shared';
import {PluginRoutingModule} from '@app/plugin/plugin-routing.module';
import { PluginSelectModalComponent } from './plugin-select-modal/plugin-select-modal.component';

@NgModule({
  entryComponents: [PluginSelectModalComponent],
  declarations: [PluginComponent, PluginListComponent, PluginSelectModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    PluginRoutingModule
  ]
})
export class PluginModule { }
