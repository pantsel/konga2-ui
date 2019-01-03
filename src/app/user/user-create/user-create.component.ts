import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from '@app/core/api/api.service';
import {loginPage, NotificationService} from '@app/core';

@Component({
  selector: 'anms-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCreateComponent implements OnInit {

  form: FormGroup;
  errorMsg: string;
  submitting: boolean;

  constructor(public dialogRef: MatDialogRef<UserCreateComponent>,
              public fb: FormBuilder,
              public translate: TranslateService,
              public api: ApiService,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', Validators.compose([Validators.required])],
      emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
      isSuperAdmin: [false],
      active: [true],
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
    this.api.post(`users`, data)
      .subscribe(result => {
        console.log(`Created User! => `, result)
        this.notificationService.success(this.translate.instant(`konga.create_user_success`))
        this.dialogRef.close(result);
      }, error => {
        this.errorMsg = this.api.getErrorMessage(error);
        this.submitting = false;
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
