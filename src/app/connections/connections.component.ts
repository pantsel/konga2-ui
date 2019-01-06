import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {FormBuilder} from '@angular/forms';
import {DialogService} from '@app/core/dialog/dialog.service';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {AppState, NotificationService} from '@app/core';
import {MatDialog} from '@angular/material';
import {ListConfigService} from '@app/core/list-config/list-config.service';
import {Router} from '@angular/router';
import {DataTableComponent} from '@app/core/data-table/data-table.component';
import {ConnectionsCreateComponent} from '@app/connections/connections-create/connections-create.component';
import {KongApiService} from '@app/core/api/kong-api.service';
import {AuthService} from '@app/core/auth/auth.service';
import * as _ from 'lodash';
import {ConnectionsService} from '@app/connections/connections.service';

@Component({
  selector: 'anms-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent extends DataTableComponent implements OnInit {

  constructor(public api: ApiService,
              public kong: KongApiService,
              public fb: FormBuilder,
              public dialog: DialogService,
              public translate: TranslateService,
              public authService: AuthService,
              public connectionsService: ConnectionsService,
              public store: Store<AppState>,
              public notificationsService: NotificationService,
              public matDialog: MatDialog,
              public listConfig: ListConfigService,
              public router: Router) {
    super(api, kong, translate, dialog, notificationsService, store, listConfig, fb);

    this.model = `connection`;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  openCreateModal() {
    const dialogRef = this.matDialog.open(ConnectionsCreateComponent, {
      width: '600px',
      autoFocus: true,
      disableClose: true,
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  async onToggleConnectionActive(connection) {

    connection.busy = true;

    if (this.isActiveConnection(connection)) {
      await this.connectionsService.deactivateConnection(connection);
    }else{
      const updatedConnection: any = await this.connectionsService.activateConnection(connection);

      // Update item in list
      const item = _.find(this.data.results, _item => _item.id === updatedConnection.id);
      if (item) item.kongVersion = updatedConnection.kongVersion;
    }

    connection.busy = false;
  }

  async loadData() {
    super.loadData();
    // Update connections on connectionsService
  }

  onDeleteItem(item) {
    if (this.isActiveConnection(item)) {
      return this.dialog.warning(this.translate.instant('konga.connections.delete_active_connection_warn'))
    }

    super.deleteItem(item);
  }


  isActiveConnection(connection) {
    return this.connectionsService.isActiveConnection(connection);
  }

}
