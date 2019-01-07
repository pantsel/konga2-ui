import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from '@app/core/api/api.service';
import {NotificationService} from '@app/core';
import * as _ from 'lodash';
import {ConnectionsService} from '@app/connections/connections.service';

@Component({
  selector: 'anms-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectionFormComponent implements OnInit {

  @Input() existingConnection: any;
  @Output() connectionCreated = new EventEmitter();
  @Output() connectionUpdated = new EventEmitter();

  form: FormGroup;
  errorMsg: string;
  submitting: boolean;

  connectionTypes = ['no_auth', 'key_auth', 'jwt'];
  jwtAlgos = ['HS256', 'RS256']

  constructor(public fb: FormBuilder,
              public translate: TranslateService,
              public api: ApiService,
              public connectionsService: ConnectionsService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [_.get(this.existingConnection, 'name', ''), Validators.compose([Validators.required])],
      type: [_.get(this.existingConnection, 'type', this.connectionTypes[0])],
      kongAdminUrl: [_.get(this.existingConnection, 'kongAdminUrl', ''), Validators.compose([Validators.required])],
      kongApiKey: [_.get(this.existingConnection, 'kongApiKey', '')],
      jwtAlgorithm: [_.get(this.existingConnection, 'jwtAlgorithm', 'HS256')],
      jwtKey: [_.get(this.existingConnection, 'jwtKey', '')],
      jwtSecret: [_.get(this.existingConnection, 'jwtSecret', '')]
    });
  }

  typeChange($index) {
    console.log('Connection type changed =>', $index);
    this.form.controls['type'].patchValue(this.connectionTypes[$index]);
    switch ($index) {
      case 0:
        // Remove all extra validators
        this.form.get('kongApiKey').setValidators([]);
        this.form.get('jwtKey').setValidators([]);
        this.form.get('jwtSecret').setValidators([]);
        break;
      case 1:
        // Keep only key_auth validators
        this.form.get('kongApiKey').setValidators([Validators.required]);
        // Remove JWT validators
        this.form.get('jwtKey').setValidators([]);
        this.form.get('jwtSecret').setValidators([]);
        break;
      case 2:
        // Keep only jwt validators
        this.form.get('jwtKey').setValidators([Validators.required]);
        this.form.get('jwtSecret').setValidators([Validators.required]);
        // Remove key_auth validators
        this.form.get('kongApiKey').setValidators([]);
        break;
    }

    this.form.controls['kongApiKey'].updateValueAndValidity();
    this.form.controls['jwtKey'].updateValueAndValidity();
    this.form.controls['jwtSecret'].updateValueAndValidity();
  }

  async submit(data) {
    this.submitting = true;
    if (this.existingConnection) {
      await this.update(data);
    }else{
      await this.create(data);
    }
    this.submitting = false;
  }

  async create(data) {
    try {
      const result = await this.api.post(`connections`, data).toPromise();
      console.log(`Created Connection! => `, result)
      this.notificationService.success(this.translate.instant(`konga.create_connection_success`))
      this.connectionCreated.emit(result);
    }catch (error) {
      this.errorMsg = this.api.getErrorMessage(error);
      this.submitting = false;
    }
  }

  async update(data) {
    try {
      const result = await this.api.update(`connections/${this.existingConnection.id}`, data).toPromise();
      console.log(`Created Connection! => `, result)
      this.notificationService.success(this.translate.instant(`konga.update_connection_success`))
      this.connectionUpdated.emit(result);
    }catch (error) {
      this.errorMsg = this.api.getErrorMessage(error);
      this.submitting = false;
    }
  }

}
