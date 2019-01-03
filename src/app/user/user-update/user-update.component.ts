import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '@app/core/api/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppState, NotificationService, selectAuth} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'anms-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  detailsForm: FormGroup;
  detailsFormErrorMsg: string;
  submitting: boolean;

  private sub: any;
  public id: any;
  public user: any;

  auth$: Observable<any>;
  authUser: any;

  constructor(private route: ActivatedRoute,
              public fb: FormBuilder,
              public translate: TranslateService,
              public store: Store<AppState>,
              public notificationsService: NotificationService,
              private api: ApiService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.fetchUser();
    });

    this.auth$ = this.store.pipe(select(selectAuth));
    this.auth$.subscribe(data => {
      this.authUser = data.user;
    })
  }

  ngOnInit() {
  }

  createDetailsForm() {
    this.detailsForm = this.fb.group({
      fullName: [this.user.fullName, Validators.compose([Validators.required])],
      emailAddress: [this.user.emailAddress, Validators.compose([Validators.required, Validators.email])],
      isSuperAdmin: [this.user.isSuperAdmin],
    });

    if (this.authUser.id === this.user.id) {
      this.detailsForm.get('isSuperAdmin').disable();
    }
  }

  fetchUser() {
    this.api.get(`users/${this.id}`)
      .subscribe(data => {
        this.user = data;
        this.createDetailsForm();
      })
  }

  updateDetails(data) {
    this.submitting = true;
    this.api.patch(`users/${this.user.id}`, data)
      .subscribe(result => {
        console.log('User details updated =>', result);
        this.submitting = false;
        this.user = result;
        this.notificationsService.success(this.translate.instant('konga.changes_saved'));
      }, error => {
        this.detailsFormErrorMsg = this.api.getErrorMessage(error);
        this.submitting = false;
      })
  }

}
