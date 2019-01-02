import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '@app/shared';

@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
