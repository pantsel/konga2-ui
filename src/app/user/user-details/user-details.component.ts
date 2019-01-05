import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '@app/core/api/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppState, NotificationService, selectAuth} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {SharedUserService} from '@app/user/shared-user.service';
import {BaseComponent} from '@app/core/base/base.component';
import {DialogService} from '@app/core/dialog/dialog.service';

@Component({
  selector: 'anms-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent extends BaseComponent implements OnInit {

  detailsForm: FormGroup;
  detailsFormErrorMsg: string;
  submitting: boolean;

  public id: any;
  public user: any;

  constructor(private route: ActivatedRoute,
              public fb: FormBuilder,
              public translate: TranslateService,
              private sharedUserService: SharedUserService,
              public store: Store<AppState>,
              public dialog: DialogService,
              public notificationsService: NotificationService,
              public api: ApiService) {

    super(api, notificationsService, translate, dialog, store);

    sharedUserService._user.subscribe(user => {
      this.user = user;
      if (user) this.createDetailsForm();
    })
  }

  ngOnInit() {
    super.ngOnInit();
  }

  createDetailsForm() {
    this.detailsForm = this.fb.group({
      fullName: [this.user.fullName, Validators.compose([Validators.required])],
      emailAddress: [this.user.emailAddress, Validators.compose([Validators.required, Validators.email])],
      active: [this.user.active],
      isSuperAdmin: [this.user.isSuperAdmin],
    });

    // A user can't change his own superAdmin and active statuses
    setTimeout(() => {
      if (this.authUser.id === this.user.id) {
        this.detailsForm.get('isSuperAdmin').disable();
        this.detailsForm.get('active').disable();
      }else{
        this.detailsForm.get('isSuperAdmin').enable();
        this.detailsForm.get('active').enable();
      }
    })

  }

  updateDetails(data) {
    this.submitting = true;
    this.api.patch(`users/${this.user.id}`, data)
      .subscribe(result => {
        console.log('User details updated =>', result);
        this.submitting = false;
        this.sharedUserService._user.next(result);
        this.notificationsService.success(this.translate.instant('konga.changes_saved'));
      }, error => {
        this.detailsFormErrorMsg = this.api.getErrorMessage(error);
        this.submitting = false;
      })
  }

}
