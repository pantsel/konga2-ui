import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {FormBuilder} from '@angular/forms';
import {DialogService} from '@app/core/dialog/dialog.service';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {AppState, NotificationService} from '@app/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {DataTableComponent} from '@app/core/data-table/data-table.component';
import {ConnectionsCreateComponent} from '@app/connections/connections-create/connections-create.component';
import * as _ from 'lodash';
import {ConnectionsService} from '@app/connections/connections.service';
import {KongEntities} from '@app/core/kong-entities/kong-entities';

@Component({
  selector: 'anms-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent extends DataTableComponent implements OnInit {

  constructor(public api: ApiService,
              public fb: FormBuilder,
              public dialog: DialogService,
              public translate: TranslateService,
              public connectionsService: ConnectionsService,
              public store: Store<AppState>,
              public notificationsService: NotificationService,
              public matDialog: MatDialog,
              public kongEntities: KongEntities,
              public router: Router) {
    super(api, translate, dialog, notificationsService, store, kongEntities, fb);

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
        this.connectionsService.itemAdded$.next(result);
        this.loadData();
      }
    });
  }

  editConnection(connection) {
    const dialogRef = this.matDialog.open(ConnectionsCreateComponent, {
      width: '600px',
      autoFocus: true,
      disableClose: true,
      data: {
        connection: connection
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.connectionsService.itemUpdated$.next(result);
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
  }

  onDeleteItem(item) {
    if (this.isActiveConnection(item)) {
     return this.dialog.warning(this.translate.instant('konga.connections.delete_active_connection_warn'))
    }

    const title = this.translate.instant('konga.delete_item_title');
    const text = this.translate.instant('konga.delete_item_text');
    this.dialog.confirm(title, text)
      .then(confirm => {
        if (confirm) {
          this.deleteItem(item);
        }
      });

  }

  deleteItem(item) {
    this.api.delete(`connections/${item.id}`).subscribe((deleted: any) => {
      this.connectionsService.itemDeleted$.next(deleted);
      this.loadData();
    });
  }


  isActiveConnection(connection) {
    return this.connectionsService.isActiveConnection(connection);
  }

}
