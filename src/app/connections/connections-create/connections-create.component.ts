import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from '@app/core/api/api.service';
import {NotificationService} from '@app/core';
import * as _ from 'lodash';

@Component({
  selector: 'anms-connections-create',
  templateUrl: './connections-create.component.html',
  styleUrls: ['./connections-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectionsCreateComponent implements OnInit {

  existingConnection: any;
  form: FormGroup;
  errorMsg: string;
  submitting: boolean;

  connectionTypes = ['no_auth', 'key_auth', 'jwt'];
  jwtAlgos = ['HS256', 'RS256']

  constructor(public dialogRef: MatDialogRef<ConnectionsCreateComponent>,
              public fb: FormBuilder,
              public translate: TranslateService,
              public api: ApiService,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.existingConnection = this.data.connection;
    console.log('[ConnectionsCreateComponent]: existingConnection =>', this.existingConnection);
  }

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
      this.dialogRef.close(result);
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
      this.dialogRef.close(result);
    }catch (error) {
      this.errorMsg = this.api.getErrorMessage(error);
      this.submitting = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
