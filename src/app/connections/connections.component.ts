import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {FormBuilder} from '@angular/forms';
import {DialogService} from '@app/core/dialog/dialog.service';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {AppState, NotificationService} from '@app/core';
import {MatDialog} from '@angular/material';
import {ListConfigService} from '@app/core/list-config/list-config.service';
import {Router} from '@angular/router';
import {DataTableComponent} from '@app/core/data-table/data-table.component';
import {ConnectionsCreateComponent} from '@app/connections/connections-create/connections-create.component';

@Component({
  selector: 'anms-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent extends DataTableComponent implements OnInit {

  constructor(public api: ApiService,
              public fb: FormBuilder,
              public dialog: DialogService,
              public translate: TranslateService,
              public store: Store<AppState>,
              public notificationsService: NotificationService,
              public matDialog: MatDialog,
              public listConfig: ListConfigService,
              public router: Router) {
    super(api, translate, dialog, notificationsService, store, listConfig, fb);

    this.model = `connection`;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  openCreateModal() {
    const dialogRef = this.matDialog.open(ConnectionsCreateComponent, {
      width: '600px',
      autoFocus: true,
      disableClose: true,
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

}
