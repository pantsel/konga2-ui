import {EventEmitter, Injectable} from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {KongApiService} from '@app/core/api/kong-api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState, NotificationService, selectAuth} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';
import {AuthService} from '@app/core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

  authUser: any;
  auth$: Observable<any>;

  public itemAdded$: EventEmitter<any> =  new EventEmitter<any>();
  public itemDeleted$: EventEmitter<any> = new EventEmitter<any>();
  public itemUpdated$: EventEmitter<any> = new EventEmitter<any>();
  public itemActivated$: EventEmitter<any> = new EventEmitter<any>();


  constructor(public api: ApiService,
              public translate: TranslateService,
              public authService: AuthService,
              public notificationsService: NotificationService,
              public store: Store<AppState>,
              public kong: KongApiService) {


    this.auth$ = this.store.pipe(select(selectAuth));
    this.auth$.subscribe(data => {
      this.authUser = data.user;
    })
  }

  async onToggleConnectionActive(connection) {

    connection.busy = true;

    if (this.isActiveConnection(connection)) {
      await this.deactivateConnection(connection);
    }else{
      await this.activateConnection(connection);
    }

    connection.busy = false;
  }

  async deactivateConnection(connection) {
    const updatedUser = await this.api.update(`users/${this.authUser.id}`, {
      connection: null
    }).toPromise();

    console.log(`Updated User =>`, updatedUser);

    // Update storage
    this.authService.updateStoredUser(updatedUser);

    this.notificationsService.success(this.translate.instant(`konga.connection_deactivated`, {
      name: connection.name
    }))
  }

  async activateConnection(connection) {
    // Activate connection
    const kongInfo: any = await this.checkConnection(connection);
    console.log('kongInfo =>', kongInfo);
    if (!kongInfo) return false;

    if (!connection.kongVersion || connection.kongVersion !== kongInfo.version ) {
      // Update connection's kongVersion
      connection = await this.api.update(`connections/${connection.id}`, {
        kongVersion: kongInfo.version
      }).toPromise();
    }

    const updatedUser = await this.api.update(`users/${this.authUser.id}`, {
      connection: connection.id
    }).toPromise();

    console.log(`Updated User =>`, updatedUser);

    // Update storage
    this.authService.updateStoredUser(updatedUser);

    this.notificationsService.success(this.translate.instant(`konga.connection_activated`, {
      name: connection.name
    }))

    this.itemActivated$.emit(connection);

    return connection;
  }

  async checkConnection(connection) {
    try {
      return await this.kong.get(``, {
        connection_id: connection.id
      }).toPromise()
    }catch (e) {
      this.notificationsService.error(this.translate.instant(`konga.error_establishing_connection`, {
        kongAdminUrl: connection.kongAdminUrl
      }))
    }
  }

  async loadConnections() {
    const connections = await this.api.get(`connections`).toPromise();
    return connections;
  }

  isActiveConnection(connection) {
    return connection.id === _.get(this.authUser, 'connection.id', this.authUser.connection);
  }
}
