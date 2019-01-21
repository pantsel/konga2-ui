import { Component, OnInit } from '@angular/core';
import {KongEntityDataTableComponent} from '@app/core/kong-entity-data-table/kong-entity-data-table.component';
import {KongApiService} from '@app/core/api/kong-api.service';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {ConnectionsService} from '@app/connections/connections.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {KongPlugin} from '@app/core/entities/kong-plugin';
import {KongEntityModalComponent} from '@app/shared/kong-entity-modal/kong-entity-modal.component';
import {PluginSelectModalComponent} from '@app/plugin/plugin-select-modal/plugin-select-modal.component';
import {KnownPlugins} from '@app/plugin/fixtures/plugin.groups';
import * as _ from 'lodash';
import {PluginService} from '@app/plugin/plugin.service';
import {KongPluginsList} from '@app/core/entities/kong-plugins-list';

@Component({
  selector: 'anms-plugin-list',
  templateUrl: './plugin-list.component.html',
  styleUrls: ['./plugin-list.component.css']
})
export class PluginListComponent extends KongEntityDataTableComponent implements OnInit {

  knownPlugins = KnownPlugins;

  constructor(public kong: KongApiService,
              public pluginService: PluginService,
              public translate: TranslateService,
              public dialog: DialogService,
              public connectionsService: ConnectionsService,
              public notificationsService: NotificationService,
              public store: Store<AppState>,
              public fb: FormBuilder,
              public matDialog: MatDialog) {
    super(kong, translate, dialog, notificationsService, store, connectionsService, fb, matDialog);

    this.entity = new KongPluginsList();

    pluginService.itemAdded$.subscribe(item => this.loadData());
  }

  ngOnInit() {
    super.ngOnInit()
  }


  editPlugin(plugin) {
    this.kong.get(`plugins/schema/${plugin.name}`)
      .subscribe(schema => {
        console.log(`Got ${plugin.name} schema`, schema);

        const dialogRef = this.matDialog.open(KongEntityModalComponent, {
          width: '480px',
          data: {
            isModal: true,
            entity: new KongPlugin(plugin.name, _.get(this.knownPlugins, `${plugin.name}.name`,  plugin.name), schema),
            existingData: plugin
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

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The addPlugin dialog was closed', result);
      if (result) {
        this.loadData();
      }
    });
  }

  async loadData() {

    // await this.sleep(5000);

    // this.data = null;

    try {

      const res: any = await this.api.get(this.endpoint).toPromise();
      this.isInitialLoad = !this.data ? true : false; // Initial load
      this.originalData = _.filter(res, plugin => this.isGlobal(plugin)); // Only show global plugins
      this.data = this.paginate(_.orderBy(this.originalData, [this.sortAttr], [this.sortDir]), this.limit, this.page);
      this.isLoading = false;


      console.log('[KongEntityDataTableComponent]: loadData =>', this.data)
    } catch (e) {
      this.isLoading = false;
      throw e;
    }
  }

  isGlobal(plugin) {
    return !plugin.consumer && !plugin.service && !plugin.route && !plugin.api && plugin.enabled;
  }
}
