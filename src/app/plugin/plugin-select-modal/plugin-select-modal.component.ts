import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {KnownPlugins, PluginGroups} from '@app/plugin/fixtures/plugin.groups';
import * as _ from 'lodash';
import {KongEntityModalComponent} from '@app/shared/kong-entity-modal/kong-entity-modal.component';
import {KongPlugin} from '@app/core/entities/kong-plugin';
import {KongApiService} from '@app/core/api/kong-api.service';
import {ConnectionsService} from '@app/connections/connections.service';
import {PluginService} from '@app/plugin/plugin.service';

@Component({
  selector: 'anms-plugin-select-modal',
  templateUrl: './plugin-select-modal.component.html',
  styleUrls: ['./plugin-select-modal.component.scss']
})
export class PluginSelectModalComponent implements OnInit {

  pluginGroups: any;
  selectedGroupPlugins: any;
  availablePlugins: any;

  test: any;
  showGlobalPluginsInfoAlert: boolean;

  allPlugins: any;
  addedPluginsNames = [];

  context: string;

  constructor(private dialogRef: MatDialogRef<PluginSelectModalComponent>,
              private pluginService: PluginService,
              private matDialog: MatDialog,
              private connectionsService: ConnectionsService,
              private kong: KongApiService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.determineContext();
    this.fetchAllPlugins();
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
        if (this.context !== 'consumer') {
          return value.group === group.id;
        }else {
          if (!_.get(group, 'consumer.eligible') || _.get(group, 'consumer.except', []).indexOf(key) > -1) {
            return false;
          }else{
            return value.group === group.id;
          }
        }


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
            entity: new KongPlugin(plugin.id, plugin.name, schema),
            extras: _.merge(this.data.extras || {}, {
              name: plugin.id
            })
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The create dialog was closed', result);
          if (result) {
            this.addedPluginsNames.push(result.name);
            this.pluginService.add(result); // Emit the event
          }
        });

      }, error => {
        plugin.loading = false;
      })
  }


  fetchAllPlugins() {
    this.kong.get(`plugins`)
      .subscribe(plugins => {
        console.log('fetchAllPlugins =>', plugins);


        // Gather all service plugins in an array
        if (_.get(this.data, 'extras.service.id')) {
          const servicePlugins = _.filter(plugins, plugin => {
            return _.get(this.data, 'extras.service.id') === _.get(plugin, 'service.id');
          });
          this.addedPluginsNames = _.map(servicePlugins, plugin => plugin.name);
        }else if (_.get(this.data, 'extras.route.id')) {  // Gather all route plugins in an array
          const routePlugins = _.filter(plugins, plugin => {
            return _.get(this.data, 'extras.route.id') === _.get(plugin, 'route.id');
          });
          this.addedPluginsNames = _.map(routePlugins, plugin => plugin.name);
        } else {
          // Gather all global plugins in an array
          const globalPlugins = _.filter(plugins, plugin => {
            return this.isGlobal(plugin);
          });
          this.addedPluginsNames = _.map(globalPlugins, plugin => plugin.name);
        }

        this.allPlugins = plugins;
      });
  }

  determineContext() {

    if (this.data.context) {
      this.context = this.data.context
    } else if (_.get(this.data, 'extras.service.id')) {
      this.context = 'service'
    }else if (_.get(this.data, 'extras.route.id')) {  // Gather all route plugins in an array
      this.context = 'route'
    }else if (_.get(this.data, 'extras.api.id')) {
      this.context = 'api'
    }else {
      this.showGlobalPluginsInfoAlert = true;
      this.context = 'global'
    }

    // Filter out not available groups in case we're on the `consumer` context
    this.pluginGroups = _.filter(PluginGroups, group => {
      if (this.context !== 'consumer') return true;
      return _.get(group, 'consumer.eligible')
    })
  }

  isContextGlobal() {
    return !_.get(this.data, 'extras.service.id') && !_.get(this.data, 'extras.route.id') && _.get(this.data, 'extras.consumer.id');
  }

  isGlobal(plugin) {
    return !plugin.consumer && !plugin.service && !plugin.route && !plugin.api && plugin.enabled;
  }

  isAdded(plugin) {
    return this.addedPluginsNames.indexOf(plugin) > -1;
  }


  close(data?) {
    this.dialogRef.close(data);
  }

}
