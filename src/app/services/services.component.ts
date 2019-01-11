import { Component, OnInit } from '@angular/core';
import {KongEntityDataTableComponent} from '@app/core/kong-entity-data-table/kong-entity-data-table.component';
import {KongApiService} from '@app/core/api/kong-api.service';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {FormBuilder} from '@angular/forms';
import {ConnectionsService} from '@app/connections/connections.service';
import {MatDialog} from '@angular/material';
import {ServicesCreateComponent} from '@app/services/services-create/services-create.component';
import {KongEntities} from '@app/core/kong-entities/kong-entities';

@Component({
  selector: 'anms-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent extends KongEntityDataTableComponent implements OnInit {

  constructor(public kong: KongApiService,
              public translate: TranslateService,
              public dialog: DialogService,
              public connectionsService: ConnectionsService,
              public notificationsService: NotificationService,
              public store: Store<AppState>,
              public kongEntities: KongEntities,
              public fb: FormBuilder,
              private matDialog: MatDialog) {
    super(kong, translate, dialog, notificationsService, store, connectionsService, kongEntities, fb)

    this.model = `service`;
  }

  ngOnInit() {
    super.ngOnInit();
  }


  openCreateModal() {
    const dialogRef = this.matDialog.open(ServicesCreateComponent, {
      width: '480px',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The create dialog was closed', result);
      if (result) {
        this.loadData();
      }
    });
  }
}


