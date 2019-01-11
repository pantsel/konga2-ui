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
import {FooterModule} from '@app/footer/footer.module';
import {ConnectionsService} from '@app/connections/connections.service';
import { InfoComponent } from './info/info.component';
import {DialogModule} from '@app/core/dialog/dialog.module';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    DialogModule,

    // features
    SettingsModule,
    FooterModule,
    EntryModule,
    DashboardModule,

    // app
    AppRoutingModule,

    // Specify your library as an import
    NgxPermissionsModule.forRoot()
  ],
  declarations: [AppComponent, InfoComponent],
  providers: [AuthService, ConnectionsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
