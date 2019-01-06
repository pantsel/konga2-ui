import { Component, OnInit } from '@angular/core';
import {ConnectionsService} from '@app/connections/connections.service';
import {BaseComponent} from '@app/core/base/base.component';
import {ApiService} from '@app/core/api/api.service';
import {AppState, NotificationService} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {Store} from '@ngrx/store';

@Component({
  selector: 'anms-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends BaseComponent implements OnInit {

  connections: any;

  constructor(
    public api: ApiService,
    public notificationService: NotificationService,
    public translate: TranslateService,
    public dialog: DialogService,
    public store: Store<AppState>,
    public connectionsService: ConnectionsService) {
    super(api, notificationService, translate, dialog, store);

    this.connectionsService.itemAdded$.subscribe(data => {
      if (data) this.loadConnections();
    })

    this.connectionsService.itemDeleted$.subscribe(data => {
      if (data) this.loadConnections();
    })

  }

  ngOnInit() {
    super.ngOnInit();
    this.loadConnections();

  }

  loadConnections() {

    // Subscribe to connections events
    this.connectionsService.loadConnections()
      .then(connections => {
        console.log('[FooterComponent]: Loaded connections', connections);
        this.connections = connections
      });
  }

  isActiveConnection(connection) {
    return this.connectionsService.isActiveConnection(connection);
  }

  async activateConnection($event, connection) {
    $event.stopPropagation();
    connection.busy = true;
    await this.connectionsService.activateConnection(connection);
    connection.busy = false;
  }

  // shouldShowToolbar() {
  //   return window.location.pathname.indexOf('welcome') < 0
  //     && window.location.pathname.indexOf('login') < 0;
  // }
  //
  // shouldShowSidenav() {
  //   return window.location.pathname.indexOf('welcome') < 0
  //     && window.location.pathname.indexOf('login') < 0;
  // }


}
