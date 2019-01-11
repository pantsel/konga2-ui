import {Component, OnInit} from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {MatDialog} from '@angular/material';
import {DataTableComponent} from '@app/core/data-table/data-table.component';
import {FormBuilder} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {AppState, NotificationService} from '@app/core';
import {Store} from '@ngrx/store';
import {UserCreateComponent} from '@app/user/user-create/user-create.component';
import {Router} from '@angular/router';
import {Entities} from '@app/core/entities/entities';

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
              public entities: Entities,
              public router: Router) {

    super(api, translate, dialog, notificationsService, store, entities, fb);

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
        this.router.navigate(['users', result.id])
      }
    });
  }
}
