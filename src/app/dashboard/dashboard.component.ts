import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BaseComponent} from '@app/core/base/base.component';
import {ApiService} from '@app/core/api/api.service';
import {AppState, NotificationService} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {Store} from '@ngrx/store';
import {ConnectionsService} from '@app/connections/connections.service';

@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  hasConnections = true; // Start by assuming that we have created at least one connection

  constructor(public api: ApiService,
              public notificationService: NotificationService,
              public translate: TranslateService,
              public dialog: DialogService,
              public store: Store<AppState>,
              public connectionsService: ConnectionsService) {
    super(api, notificationService, translate, dialog, store);

  }

  ngOnInit() {
    this.connectionsService.totalCountChanged$.subscribe(count => {
      console.log('[DashboardComponent]: connectionsService.totalCountChanged$ =>', count);
      this.hasConnections = count > 0 ? true : false;
      if (this.hasConnections) {
        this.loadData();
      }
    })

  }

  async onConnectionCreated(connection) {
    this.connectionsService.itemAdded$.next(connection);
    this.connectionsService.activateConnection(connection)
      .then(activated => {
        console.log('[DashboardComponent]: connection activated', activated);
        if (!activated) {

        }
      })
  }

  loadData() {
    console.log(`['DashboardComponent']: loading data`)
  }

}
