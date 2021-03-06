import { Component, OnInit } from '@angular/core';
import {KongEntityDataTableComponent} from '@app/core/kong-entity-data-table/kong-entity-data-table.component';
import {KongApiService} from '@app/core/api/kong-api.service';
import {PluginService} from '@app/plugin/plugin.service';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {ConnectionsService} from '@app/connections/connections.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {SharedConsumerService} from '@app/consumer/consumer.component';
import {KongPluginsList} from '@app/core/entities/kong-plugins-list';
import {KongEntityModalComponent} from '@app/shared/kong-entity-modal/kong-entity-modal.component';
import {KongPlugin} from '@app/core/entities/kong-plugin';
import * as _ from 'lodash';
import {KnownPlugins} from '@app/plugin/fixtures/plugin.groups';
import {PluginSelectModalComponent} from '@app/plugin/plugin-select-modal/plugin-select-modal.component';

@Component({
  selector: 'anms-consumer-plugins',
  templateUrl: './consumer-plugins.component.html',
  styleUrls: ['./consumer-plugins.component.css']
})
export class ConsumerPluginsComponent extends KongEntityDataTableComponent implements OnInit {

  consumer: any;

  constructor(public kong: KongApiService,
              public pluginService: PluginService,
              public translate: TranslateService,
              public dialog: DialogService,
              public connectionsService: ConnectionsService,
              public notificationsService: NotificationService,
              public store: Store<AppState>,
              public fb: FormBuilder,
              public matDialog: MatDialog,
              private shared: SharedConsumerService) {
    super(kong, translate, dialog, notificationsService, store, connectionsService, fb, matDialog);

    pluginService.itemAdded$.subscribe(item => this.loadData());

    shared.data.subscribe(data => {
      this.consumer = data;
      if (this.consumer) {
        this.entity = new KongPluginsList(`consumers/${this.consumer.id}/plugins`);
      }
    })
  }

  ngOnInit() {
    super.ngOnInit();
  }

  editPlugin(plugin) {
    this.kong.get(`plugins/schema/${plugin.name}`)
      .subscribe(schema => {
        console.log(`Got ${plugin.name} schema`, schema);

        const dialogRef = this.matDialog.open(KongEntityModalComponent, {
          width: '480px',
          data: {
            isModal: true,
            entity: new KongPlugin(plugin.name, _.get(KnownPlugins, `${plugin.name}.name`,  plugin.name), schema),
            existingData: plugin,
            context: 'consumer'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The create dialog was closed', result);
          if (result) {
            this.loadData();
          }
        });

      })
  }

  addPlugin() {
    const dialogRef = this.matDialog.open(PluginSelectModalComponent, {
      width: '860px',
      data: {
        extras: {
          consumer: {
            id: this.consumer.id
          }
        },
        context: 'consumer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The addPlugin dialog was closed', result);
      if (result) {
        this.loadData();
      }
    });
  }

}
