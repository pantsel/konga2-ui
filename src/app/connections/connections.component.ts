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
      connection = await this.api.update(`connections/${connection.id}`,{
        kongVersion: kongInfo.version
      }).toPromise();

      // Update item in list
      const item = _.find(this.data.results, _item => _item.id === connection.id);
      if (item) item.kongVersion = connection.kongVersion;
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

  isActiveConnection(connection) {
    return connection.id === _.get(this.authUser, 'connection.id', this.authUser.connection);
  }

}
