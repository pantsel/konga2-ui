import {Component, OnInit} from '@angular/core';
import {ConnectionsService} from '@app/connections/connections.service';
import {ApiService} from '@app/core/api/api.service';
import * as _ from 'lodash';
import {BaseComponent} from '@app/core/base/base.component';
import {AppState, NotificationService} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {Store} from '@ngrx/store';

@Component({
  selector: 'anms-connection-chooser',
  templateUrl: './connection-chooser.component.html',
  styleUrls: ['./connection-chooser.component.css']
})
export class ConnectionChooserComponent extends BaseComponent implements OnInit {

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
      if (data) this.addConnection(data);
    })

    this.connectionsService.itemDeleted$.subscribe(data => {
      if (data) this.deleteConnection(data);
    })
  }

  ngOnInit() {
    this.loadConnections();
  }

  loadConnections() {

    // Subscribe to connections events
    this.connectionsService.loadConnections()
      .then(connections => {
        console.log('[ConnectionChooserComponent]: Loaded connections', connections);
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

  addConnection(item) {
    this.connections.totalCount++;
    this.connections.results.push(item);
  }

  deleteConnection(item) {
    const index = _.findIndex(this.connections.results, _item => _item.id === item.id);
    if (index > -1) {
      this.connections.results.splice(index, 1);
      this.connections.totalCount--;
    }
  }

}
