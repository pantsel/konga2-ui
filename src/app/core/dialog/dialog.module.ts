import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogComponent} from '@app/core/dialog/dialog.component';
import {DialogService} from '@app/core/dialog/dialog.service';
import {SharedModule} from '@app/shared';

@NgModule({
  declarations: [DialogComponent],
  entryComponents: [DialogComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [DialogService],
  exports: [DialogComponent]
})
export class DialogModule { }
