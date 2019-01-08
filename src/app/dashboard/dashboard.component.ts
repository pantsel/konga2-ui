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
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  timersData: any[] = [];
  timersXAxisLabel = 'Quantity ordered';
  timersYAxisLabel = 'Items';
  chartOptions = {
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: false,
    showXAxisLabel: false,
    showYAxisLabel: false,
    timeline: true,
    colorScheme: {
      domain: ['#2ecc71', '#3498db', '#9b59b6', '#e67e22', '#e74c3c']
    },
  }

  hasConnections = true; // Start by assuming that we have created at least one connection
  loading = true;
  errorMsg: string;
  info: any;
  status: any;

  html: any;

  objectKeys = Object.keys;

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
        this.createTimersChartData(info.timers);
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

  createTimersChartData(timers) {
    Object.keys(timers).forEach(key => {
      this.timersData.push({
        name: key,
        value: timers[key]
      })
    })
  }

  hasData() {
    return this.info || this.status;
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
  }

  convert2Unit(number) {
    if (number >= 1000000) {
      return Math.trunc(number / 1000000) + 'M+';
    }else if (number >= 1000){
      return Math.trunc(number / 1000 ) + 'K+';
    }else{
      return number.toString();
    }
  }

 isEnabled(name) {
    return this.info.plugins.enabled_in_cluster.indexOf(name) > -1
  }

}
