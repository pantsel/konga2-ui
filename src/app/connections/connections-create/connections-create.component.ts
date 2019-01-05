import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from '@app/core/api/api.service';
import {NotificationService} from '@app/core';

@Component({
  selector: 'anms-connections-create',
  templateUrl: './connections-create.component.html',
  styleUrls: ['./connections-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectionsCreateComponent implements OnInit {

  form: FormGroup;
  errorMsg: string;
  submitting: boolean;

  connectionTypes = ['default', 'key_auth', 'jwt'];
  jwtAlgos = ['HS256', 'RS256']

  constructor(public dialogRef: MatDialogRef<ConnectionsCreateComponent>,
              public fb: FormBuilder,
              public translate: TranslateService,
              public api: ApiService,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      type: ['default'],
      kongAdminUrl: ['', Validators.compose([Validators.required])],
      kongApiKey: [''],
      jwtAlgorithm: ['HS256'],
      jwtKey: [''],
      jwtSecret: ['']
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

  submit(data) {
    this.submitting = true;
    this.api.post(`connections`, data)
      .subscribe(result => {
        console.log(`Created Connection! => `, result)
        this.notificationService.success(this.translate.instant(`konga.create_connection_success`))
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
