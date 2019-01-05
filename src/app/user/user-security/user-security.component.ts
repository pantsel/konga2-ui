import { Component, OnInit } from '@angular/core';
import {SharedUserService} from '@app/user/shared-user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '@app/core';
import {ApiService} from '@app/core/api/api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'anms-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.css']
})
export class UserSecurityComponent implements OnInit {

  form: FormGroup;
  user: any;
  errorMsg: string;
  submitting: boolean;

  constructor(private sharedUserService: SharedUserService,
              private api: ApiService,
              private translate: TranslateService,
              private notificationService: NotificationService,
              public fb: FormBuilder) {
    sharedUserService._user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', Validators.required],
      passwordConfirmation: [''],
    }, {
      validator: this.confirmPasswordValidator
    });

    this.form.valueChanges.subscribe(values => {
      if (this.form.errors && this.form.errors.mismatch) {
        this.form.controls.passwordConfirmation.setErrors({mismatch: true});
      } else {
        this.form.controls.passwordConfirmation.setErrors(null);
      }
    });
  }

  confirmPasswordValidator(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordConfirmation.value;
    return pass === confirmPass ? null : { mismatch: true };
  }

  submit(data) {
    this.submitting = true;
    this.api.post(`users/${this.user.id}/changePassword`, data)
      .subscribe(result => {
        console.log(`Updated user password! => `, result)
        this.submitting = false;
        // this.form.reset();
        this.notificationService.success(this.translate.instant(`konga.changes_saved`))
      }, error => {
        this.errorMsg = this.api.getErrorMessage(error);
        this.submitting = false;
      })
  }
}
