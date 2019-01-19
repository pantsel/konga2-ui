import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {PluginGroups} from '@app/plugin/fixtures/plugin.groups';
import * as _ from 'lodash';
import {KongEntityModalComponent} from '@app/shared/kong-entity-modal/kong-entity-modal.component';
import {KongPlugin} from '@app/core/entities/kong-plugin';
import {KongApiService} from '@app/core/api/kong-api.service';

@Component({
  selector: 'anms-plugin-select-modal',
  templateUrl: './plugin-select-modal.component.html',
  styleUrls: ['./plugin-select-modal.component.scss']
})
export class PluginSelectModalComponent implements OnInit {

  pluginGroups = PluginGroups;
  objectKeys = Object.keys;

  constructor(private dialogRef: MatDialogRef<PluginSelectModalComponent>,
              public matDialog: MatDialog,
              public kong: KongApiService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
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
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", plugin)
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
