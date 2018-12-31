import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@app/core/api/api.service';
import { Store } from '@ngrx/store';
import { ActionAuthLogin, AppState } from '@app/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'anms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMsg: string;
  submitting: boolean;

  constructor(
    public fb: FormBuilder,
    public translate: TranslateService,
    private router: Router,
    private store: Store<AppState>,
    public api: ApiService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      emailAddress: [
        'tselentispanagis@gmail.com',
        Validators.compose([Validators.required, Validators.email])
      ],
      password: ['911982pt', Validators.required]
    });
  }

  signIn(credentials) {
    this.errorMsg = '';

    console.log('SIGNING IN =>', credentials);

    this.submitting = true;

    this.api.post(`auth/login`, credentials).subscribe(
      response => {
        console.log('LOGIN SUCCESS', response);
        this.store.dispatch(new ActionAuthLogin(response));
        this.submitting = false;
        this.router.navigate(['/about']);
      },
      error => {
        console.error('LOGIN FAILED', error);
        this.submitting = false;
        switch (error.status) {
          case 401:
            this.errorMsg = this.translate.instant('errors.login.unauthorized');
            break;
          default:
            this.errorMsg = error.statusText;

        }
      }
    );
  }
}
