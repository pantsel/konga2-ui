import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {KnownPlugins, PluginGroups} from '@app/plugin/fixtures/plugin.groups';
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
  selectedGroupPlugins: any;
  availablePlugins: any;

  test: any;

  constructor(private dialogRef: MatDialogRef<PluginSelectModalComponent>,
              private matDialog: MatDialog,
              private connectionsService: ConnectionsService,
              private kong: KongApiService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.connectionsService.activeNodeInfoChanged$.subscribe(info => {
      console.log('[PluginSelectModalComponent]: connectionsService.activeNodeInfoChanged$ =>', info);
      this.initPluginsData(info);
    })
  }

  initPluginsData(info: any) {

    if (!info) return false;

    // Filter out not available plugins
    this.availablePlugins =  _.pickBy(KnownPlugins, (value, key) => {
      return info.plugins.available_on_server[key];
    });


    // Put plugins in their respective groups
    this.pluginGroups.forEach(group => {
      group.plugins = _.pickBy(this.availablePlugins, (value, key) => {
        return value.group === group.id;
      });
    });

    // Put unknown but available plugins in the `others` group
    try {
      const availableOnServerPluginNames = Object.keys(info.plugins.available_on_server);
      const knownPluginNames = Object.keys(KnownPlugins);
      const unknownPluginNames = _.difference(availableOnServerPluginNames, knownPluginNames);
      const unknownPlugins = {};
      unknownPluginNames.forEach(key => {
        unknownPlugins[key] = {
          name: key
        }
      });
      _.find(this.pluginGroups, group => group.id === 'other').plugins = unknownPlugins;
    }catch (e){}

    // Initialize selections
    this.selectedGroupPlugins = this.groupedToRow(this.pluginGroups[0].plugins, 3)
  }


  onSelectedIndexChange(index) {
    this.selectedGroupPlugins = this.groupedToRow(this.pluginGroups[index].plugins, 3)
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
    plugin.loading = true;
    this.kong.get(`plugins/schema/${plugin.id}`)
      .subscribe(schema => {
        console.log(`Got ${plugin.id} schema`, schema);

        plugin.loading = false;
        const dialogRef = this.matDialog.open(KongEntityModalComponent, {
          width: '480px',
          data: {
            isModal: true,
            entity: new KongPlugin(plugin.name, schema)
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The create dialog was closed', result);
        });

      }, error => {
        plugin.loading = false;
      })
  }


  close(data?) {
    this.dialogRef.close(data);
  }

}
