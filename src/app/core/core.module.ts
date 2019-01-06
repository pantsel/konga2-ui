import {
  NgModule,
  Optional,
  SkipSelf,
  ErrorHandler,
  APP_INITIALIZER
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Store, StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';

import { environment } from '@env/environment';

import { httpInterceptorProviders } from './http-interceptors';
import { LocalStorageService } from './local-storage/local-storage.service';
import { AuthEffects } from './auth/auth.effects';
import { AuthGuardService } from './auth/auth-guard.service';
import { AnimationsService } from './animations/animations.service';
import { TitleService } from './title/title.service';
import {reducers, metaReducers, AppState} from './core.state';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { CustomSerializer } from './router/custom-serializer';
import { NotificationService } from './notifications/notification.service';
import { ApiService } from '@app/core/api/api.service';
import { BootService } from '@app/core/boot/boot.service';
import * as _ from 'lodash';
import {ActionAuthLogin, ActionAuthLogout} from '@app/core/auth/auth.actions';
import {ListConfigService} from '@app/core/list-config/list-config.service';
import {AppEventsService} from '@app/core/app-events/app-events.service';
import {DialogModule} from '@app/core/dialog/dialog.module';
import { BaseComponent } from './base/base.component';
import {KongApiService} from '@app/core/api/kong-api.service';

export const loadConfig = (bootProvider: BootService, store: Store<AppState>) => {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      bootProvider
        .init()
        .then(result => {
          console.log('bootProvider.load():result', result);
          window['_csrf'] = result._csrf;

          // If there is no superAdmin registered yet,
          // navigate to the welcome page to create one.
          if (!_.get(result, 'hasSuperAdmin')) {
            console.log('No SuperAdmin found. Redirecting to welcome page');
            window['_needsOnboarding'] = true;
            return  resolve(result);
          }

          // Check if the user is already logged in
          if (_.get(result, 'loggedInUser.id')) {
            console.log('User logged in!', result.loggedInUser);
            store.dispatch(new ActionAuthLogin(result.loggedInUser));
          }else{
            console.log('User is not logged in!', result.loggedInUser);
            store.dispatch(new ActionAuthLogout());
          }


          // document.body.classList.remove('is-loading'); // Hide loader
          // document.body.classList.add('loaded'); // Hide loader
          resolve(result);
        })
        .catch(error => {
          console.error('bootProvider.load():error', error);
          // ToDo: Redirect to error page
          alert(
            `${error.error}. Maybe the connection to the server was refused.`
          );
          reject(error);
        });
    });
  };
};

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Angular NgRx Material Starter'
        }),

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    DialogModule
  ],
  declarations: [],
  providers: [
    NotificationService,
    LocalStorageService,
    AuthGuardService,
    AnimationsService,
    httpInterceptorProviders,
    ApiService,
    KongApiService,
    TitleService,
    ListConfigService,
    AppEventsService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [BootService, Store],
      multi: true
    }
  ],
  exports: [TranslateModule]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}
