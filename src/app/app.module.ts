import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryModule } from '@app/entry/entry.module';
import {AuthService} from '@app/core/auth/auth.service';
import {DashboardModule} from '@app/dashboard/dashboard.module';
import {NgxPermissionsModule} from 'ngx-permissions';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    SettingsModule,
    EntryModule,
    DashboardModule,

    // app
    AppRoutingModule,

    // Specify your library as an import
    NgxPermissionsModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
