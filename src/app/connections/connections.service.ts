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

  public kongInfo: any;

  public activeNodeData = {
    info: null,
    status: null
  }

  public itemAdded$:  BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(null)
  public activeNodeInfoChanged$:  BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(null)
  public activeNodeStatusChanged$:  BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(null)
  public itemDeleted$:  BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(null)
  public itemUpdated$:  BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(null)
  public itemActivated$:  BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(null)
  public totalCountChanged$:  BehaviorSubject<number> = <BehaviorSubject<number>>new BehaviorSubject(0)


  constructor(public api: ApiService,
              public translate: TranslateService,
              public authService: AuthService,
              public notificationsService: NotificationService,
              public store: Store<AppState>,
              public kong: KongApiService) {


    this.auth$ = this.store.pipe(select(selectAuth));
    this.auth$.subscribe(data => {
      this.authUser = data.user;

      // If a connection is assigned to the user,
      // get the node details
      if (this.authUser.connection) {
        this.getActiveNodeDetails();
      }
    })
  }

  setActiveNodeInfo(data) {
    this.activeNodeData.info = data;
    this.activeNodeInfoChanged$.next(data);
  }

  setActiveNodeStatus(data) {
    this.activeNodeData.status = data;
    this.activeNodeStatusChanged$.next(data);
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

   try {
     // Activate connection
     const kongInfo: any = await this.checkConnection(connection);
     console.log('kongInfo =>', kongInfo);

     if (!connection.kongVersion || connection.kongVersion !== kongInfo.info.version ) {
       // Update connection's kongVersion
       connection = await this.api.update(`connections/${connection.id}`, {
         kongVersion: kongInfo.info.version
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
     this.itemActivated$.next(connection);

     return connection;
   }catch (e) {
     return e;
   }
  }

  async checkConnection(connection?) {
    try {
      const info = await this.nodeInfo(connection);
      const status = await this.nodeStatus(connection);
      return {
        info: info,
        status: status
      }
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

  async nodeInfo(connection?) {
    const info = await this.kong.get(``, {
      connection_id: connection ? connection.id : ''
    }).toPromise()
    this.setActiveNodeInfo(info);
    return info;
  }

  async nodeStatus(connection?) {
    const status = await this.kong.get(`status`, {
      connection_id: connection ? connection.id : ''
    }).toPromise();
    this.setActiveNodeStatus(status);
    return status;
  }

  async getActiveNodeDetails() {
    await this.nodeInfo();
    await this.nodeStatus();
  }
}
