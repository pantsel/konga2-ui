import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageLoaderComponent} from '@app/shared/page-loader/page-loader.component';

@NgModule({
  entryComponents: [PageLoaderComponent],
  declarations: [PageLoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [PageLoaderComponent]
})
export class PageLoaderModule { }
