import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {ListConfigService} from '@app/core/list-config/list-config.service';
import * as _ from 'lodash';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {DataTableComponent} from '@app/core/data-table/data-table.component';
import {FormBuilder} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {DialogComponent} from '@app/core/dialog/dialog.component';
import {UserCreateComponent} from '@app/user/user-create/user-create.component';

@Component({
  selector: 'anms-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends DataTableComponent implements OnInit {

  constructor(public api: ApiService,
              public fb: FormBuilder,
              public dialog: DialogService,
              public translate: TranslateService,
              public store: Store<AppState>,
              public notificationsService: NotificationService,
              public matDialog: MatDialog,
              public listConfig: ListConfigService) {

    super(api, translate, dialog, notificationsService, store, listConfig, fb);

    this.model = `user`;
  }

  ngOnInit() {
    super.ngOnInit();
  }


  openCreateUserModal() {
    const dialogRef = this.matDialog.open(UserCreateComponent, {
      width: '400px',
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
