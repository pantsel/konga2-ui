import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {KongEntityDataTableComponent} from '@app/core/kong-entity-data-table/kong-entity-data-table.component';
import {KongApiService} from '@app/core/api/kong-api.service';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {ConnectionsService} from '@app/connections/connections.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ServiceCreateComponent} from '@app/service/service-create/service-create.component';
import {KongService} from '@app/core/entities/kong-service';

@Component({
  selector: 'anms-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent extends KongEntityDataTableComponent implements OnInit {

  constructor(public kong: KongApiService,
              public translate: TranslateService,
              public dialog: DialogService,
              public connectionsService: ConnectionsService,
              public notificationsService: NotificationService,
              public store: Store<AppState>,
              public fb: FormBuilder,
              public matDialog: MatDialog) {
    super(kong, translate, dialog, notificationsService, store, connectionsService, fb, matDialog)

    this.entity = KongService;
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
