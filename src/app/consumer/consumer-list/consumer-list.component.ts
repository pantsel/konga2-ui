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
import {KongConsumer} from '@app/core/entities/kong-consumer';
import {KongEntityModalComponent} from '@app/shared/kong-entity-modal/kong-entity-modal.component';

@Component({
  selector: 'anms-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.css']
})
export class ConsumerListComponent  extends KongEntityDataTableComponent implements OnInit {

  constructor(public kong: KongApiService,
              public translate: TranslateService,
              public dialog: DialogService,
              public connectionsService: ConnectionsService,
              public notificationsService: NotificationService,
              public store: Store<AppState>,
              public fb: FormBuilder,
              private matDialog: MatDialog) {
    super(kong, translate, dialog, notificationsService, store, connectionsService, fb);

    this.entity = KongConsumer;

  }

  ngOnInit() {
    super.ngOnInit();
  }


  openCreateModal() {
    const dialogRef = this.matDialog.open(KongEntityModalComponent, {
      width: '480px',
      data: {
        isModal: true,
        entity: KongConsumer
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
