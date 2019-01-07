import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BaseComponent} from '@app/core/base/base.component';
import {ApiService} from '@app/core/api/api.service';
import {AppState, NotificationService} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {Store} from '@ngrx/store';
import {ConnectionsService} from '@app/connections/connections.service';
import {KongApiService} from '@app/core/api/kong-api.service';

@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  hasConnections = true; // Start by assuming that we have created at least one connection
  loading = true;
  errorMsg: string;
  info: any;
  status: any;

  constructor(public api: ApiService,
              public kong: KongApiService,
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
      }else{
        this.loading = false;
      }
    })

    this.connectionsService.activeNodeInfoChanged$.subscribe(info => {
      console.log('[DashboardComponent]: connectionsService.activeNodeInfoChanged$ =>', info);
      if (info) {
        this.info = info;
        this.loading = false;
      }
    })

    this.connectionsService.activeNodeStatusChanged$.subscribe(status => {
      console.log('[DashboardComponent]: connectionsService.activeNodeStatusChanged$ =>', status);
      if (status) {
        this.status = status;
        this.loading = false;
      }
    })

  }

  async onConnectionCreated(connection) {
    this.connectionsService.itemAdded$.next(connection);
    this.loading = true;
    this.connectionsService.activateConnection(connection)
      .then(activated => {
        console.log('[DashboardComponent]: connection activated', activated);
        if (!activated) {
          this.loading = false;
          this.errorMsg = this.translate.instant(`konga.error_establishing_connection`, {
            kongAdminUrl: connection.kongAdminUrl
          });
        }
      })
  }

  loadData() {
    console.log(`['DashboardComponent']: loading data`)
    if (!this.authUser.connection) { // There is no connection activated
      this.loading = false;
      return false;
    }

    // this.kong.get(``)
    //   .subscribe(data => {
    //     console.log('[DashboardComponent]: loadData', data);
    //     this.connectionsService.setActiveNodeInfo(data);
    //   }, error => {
    //     this.loading = false;
    //   })
    //
    // this.kong.get(`status`)
    //   .subscribe(status => {
    //     console.log('[DashboardComponent]: loadStatus', status);
    //     this.status = status;
    //   }, error => {
    //     this.loading = false;
    //   })
  }

}
