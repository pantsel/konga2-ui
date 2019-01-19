import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {PluginGroups} from '@app/plugin/fixtures/plugin.groups';
import * as _ from 'lodash';
import {KongEntityModalComponent} from '@app/shared/kong-entity-modal/kong-entity-modal.component';
import {KongPlugin} from '@app/core/entities/kong-plugin';
import {KongApiService} from '@app/core/api/kong-api.service';
import {ConnectionsService} from '@app/connections/connections.service';

@Component({
  selector: 'anms-plugin-select-modal',
  templateUrl: './plugin-select-modal.component.html',
  styleUrls: ['./plugin-select-modal.component.scss']
})
export class PluginSelectModalComponent implements OnInit {

  pluginGroups = PluginGroups;
  selectedGroup: any;
  selectedGroupPlugins: any;
  objectKeys = Object.keys;
  availablePlugins: any;

  test: any;

  constructor(private dialogRef: MatDialogRef<PluginSelectModalComponent>,
              private matDialog: MatDialog,
              private connectionsService: ConnectionsService,
              private kong: KongApiService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedGroup = this.pluginGroups[0];
    this.selectedGroupPlugins = this.groupedToRow(this.selectedGroup.plugins, 3)
  }

  ngOnInit() {
    this.connectionsService.activeNodeInfoChanged$.subscribe(info => {
      console.log('[PluginSelectModalComponent]: connectionsService.activeNodeInfoChanged$ =>', info);
      if (info) {
        this.availablePlugins = info.plugins.available_on_server;
      }
    })
  }


  onSelectedIndexChange(index) {
    this.selectedGroup = this.pluginGroups[index];
    this.selectedGroupPlugins = this.groupedToRow(this.selectedGroup.plugins, 3)
  }


  groupedToRow(plugins, k) {

    const pluginsArray = [];
    Object.keys(plugins).forEach(key => {
      pluginsArray.push(_.merge(plugins[key], {id: key}))
    })

    const newArray = []
    for (let i = 0; i < pluginsArray.length; i += k) {
      newArray.push({ items: pluginsArray.slice(i, i + k) });
    }

    return newArray;

  }

  onAddPlugin(plugin) {
    this.kong.get(`plugins/schema/${plugin.id}`)
      .subscribe(schema => {
        console.log(`Got ${plugin.id} schema`, schema);

        const dialogRef = this.matDialog.open(KongEntityModalComponent, {
          width: '480px',
          data: {
            isModal: true,
            entity: new KongPlugin(plugin.id, schema)
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The create dialog was closed', result);
        });

      })
  }


  close(data?) {
    this.dialogRef.close(data);
  }

}
