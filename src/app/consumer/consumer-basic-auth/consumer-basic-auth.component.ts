import { Component, OnInit } from '@angular/core';
import {KongEntityDataTableComponent} from '@app/core/kong-entity-data-table/kong-entity-data-table.component';
import {KongApiService} from '@app/core/api/kong-api.service';
import {MatDialog} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {ConnectionsService} from '@app/connections/connections.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {FormBuilder} from '@angular/forms';
import {SharedConsumerService} from '@app/consumer/consumer.component';
import {KongConsumerBasicAuth} from '@app/core/entities/kong-consumer-basic-auth';

@Component({
  selector: 'anms-consumer-basic-auth',
  templateUrl: './consumer-basic-auth.component.html',
  styleUrls: ['./consumer-basic-auth.component.css']
})
export class ConsumerBasicAuthComponent extends KongEntityDataTableComponent implements OnInit {

  consumer: any;

  constructor(public kong: KongApiService,
              public matDialog: MatDialog,
              public translate: TranslateService,
              public dialog: DialogService,
              public connectionsService: ConnectionsService,
              public notificationsService: NotificationService,
              public store: Store<AppState>,
              public fb: FormBuilder,
              private shared: SharedConsumerService) {
    super(kong, translate, dialog, notificationsService, store, connectionsService, fb, matDialog);

    shared.data.subscribe(data => {
      this.consumer = data;
      this.entity = new KongConsumerBasicAuth(this.consumer.id);
    })
  }

  ngOnInit() {
    super.ngOnInit()
  }

}
