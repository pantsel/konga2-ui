import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@app/core/api/api.service';
import {select, Store} from '@ngrx/store';
import {ActionAuthLogin, AppState, selectIsAuthenticated} from '@app/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {AuthService} from '@app/core/auth/auth.service';

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
    private auth: AuthService,
    public api: ApiService
  ) {}


  ngOnInit() {
    this.form = this.fb.group({
      emailAddress: [
        '',
        Validators.compose([Validators.required, Validators.email])
      ],
      password: ['', Validators.required]
    });
  }

  async signIn(credentials) {
    this.errorMsg = '';

    console.log('SIGNING IN =>', credentials);

    this.submitting = true;

    try {
      const loggedInUser = await this.auth.login(credentials);
      console.log('LOGIN SUCCESS', loggedInUser);
      this.submitting = false;
    } catch (error) {
      console.error('LOGIN FAILED', error);
      this.errorMsg = this.api.getErrorMessage(error);
    }

    this.submitting = false;
  }
}
