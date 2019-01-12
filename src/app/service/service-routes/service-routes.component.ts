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
import {KongService} from '@app/core/entities/kong-service';
import {SharedServiceService} from '@app/service/service.component';
import {KongRoute} from '@app/core/entities/kong-route';
import {ServiceCreateComponent} from '@app/service/service-create/service-create.component';
import {KongFormComponent} from '@app/shared/kong-form/kong-form.component';
import {KongEntityModalComponent} from '@app/shared/kong-entity-modal/kong-entity-modal.component';

@Component({
  selector: 'anms-service-routes',
  templateUrl: './service-routes.component.html',
  styleUrls: ['./service-routes.component.css']
})
export class ServiceRoutesComponent extends KongEntityDataTableComponent implements OnInit {

  service: any;

  constructor(public kong: KongApiService,
              public shared: SharedServiceService,
              public translate: TranslateService,
              public dialog: DialogService,
              public connectionsService: ConnectionsService,
              public notificationsService: NotificationService,
              public store: Store<AppState>,
              public fb: FormBuilder,
              private matDialog: MatDialog) {

    super(kong, translate, dialog, notificationsService, store, connectionsService, fb)

    this.shared.data.subscribe(data => {
      if (data) {
        this.service = data;
        this.entity = KongRoute;
        this.endpoint = `${KongService.endpoint}/${data.id}/${this.entity.endpoint}`
      }

    });
  }

  ngOnInit() {
    super.ngOnInit();
  }


  openCreateModal() {
    const dialogRef = this.matDialog.open(KongEntityModalComponent, {
      width: '480px',
      data: {
        service : {
          id: this.service.id
        },
        entity: KongRoute
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
