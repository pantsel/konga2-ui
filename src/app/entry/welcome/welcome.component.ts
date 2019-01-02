import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from '@app/core/api/api.service';
import {Router} from '@angular/router';
import {loginPage, NotificationService} from '@app/core';

@Component({
  selector: 'anms-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {

  form: FormGroup;
  errorMsg: string;
  submitting: boolean;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public translate: TranslateService,
    public api: ApiService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', Validators.compose([Validators.required])],
      emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
      isSuperAdmin: [true],
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
        console.log(`Created Super Admin! => `, result)
        window['_needsOnboarding'] = false;
        this.router.navigate([loginPage]).then(() => {
          this.notificationService.success(this.translate.instant(`konga.entry.welcome.create_super_admin_success`))
        });
      }, error => {
        this.errorMsg = this.api.getErrorMessage(error);
        this.submitting = false;
      })
  }

}
