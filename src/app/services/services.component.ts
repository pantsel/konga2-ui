import { Component, OnInit } from '@angular/core';
import {KongEntityDataTableComponent} from '@app/core/kong-entity-data-table/kong-entity-data-table.component';
import {KongApiService} from '@app/core/api/kong-api.service';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {ListConfigService} from '@app/core/list-config/list-config.service';
import {FormBuilder} from '@angular/forms';
import {ConnectionsService} from '@app/connections/connections.service';

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
              public listConfig: ListConfigService,
              public fb: FormBuilder) {
    super(kong, translate, dialog, notificationsService, store, connectionsService, listConfig, fb)

    this.model = `service`;
  }

  ngOnInit() {
    super.ngOnInit();
  }


  openCreateModal() {
  }
}


