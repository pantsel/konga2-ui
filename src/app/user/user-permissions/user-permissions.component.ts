import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {SharedUserService} from '@app/user/shared-user.service';
import {Store} from '@ngrx/store';
import {AppState, NotificationService} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {BaseComponent} from '@app/core/base/base.component';
import {DialogService} from '@app/core/dialog/dialog.service';

@Component({
  selector: 'anms-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionsComponent extends BaseComponent implements OnInit {

  allPermissions: any;
  user: any;
  submitting: boolean;

  constructor(public api: ApiService,
              public store: Store<AppState>,
              public dialog: DialogService,
              public translate: TranslateService,
              public notificationService: NotificationService,
              public sharedUserService: SharedUserService) {

    super(api, notificationService, translate, dialog, store);

    sharedUserService._user.subscribe(user => {
      this.user = user;
      this.loadPermissions();
    })
  }

  ngOnInit() {

  }

  loadPermissions() {
    this.api.get(`permissions`)
      .subscribe(data => {
        console.log('loadPermissions =>', data);
        this.allPermissions = data;
      })
  }

  getPermissionGroups() {
    return Object.keys(this.allPermissions);
  }

  hasPermission(group, permission) {
    return this.user.permissions[group].indexOf(permission) > -1
  }


  permissionChange($event, group, permission) {
    console.log(`Permission changed`, $event, group, permission);
    if ($event.checked && !this.hasPermission(group, permission)) {
      this.user.permissions[group].push(permission);
    }

    if (!$event.checked) {
      const permissionIndex = this.user.permissions[group].indexOf(permission);
      if (permissionIndex > -1) {
        this.user.permissions[group].splice(permissionIndex, 1)
      }
    }

    console.log(`Updated permissions =>`, this.user.permissions);
  }

  update() {

    this.submitting = true;
    this.api.patch(`users/${this.user.id}`, {
      permissions: this.user.permissions
    })
      .subscribe(result => {
        console.log('User permissions updated =>', result);
        this.submitting = false;
        this.sharedUserService._user.next(result);
        this.notificationService.success(this.translate.instant('konga.changes_saved'));
      }, error => {
        this.notificationService.error(this.api.getErrorMessage(error));
        this.submitting = false;
      })
  }

}
