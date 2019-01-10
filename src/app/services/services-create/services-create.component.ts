import {Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef} from '@angular/core';
import {KongBaseComponent} from '@app/core/kong-base/kong-base.component';
import {KongApiService} from '@app/core/api/kong-api.service';
import {AppState, NotificationService} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '@app/core/dialog/dialog.service';
import {Store} from '@ngrx/store';
import {MatDialogRef} from '@angular/material';
import {ListConfigService} from '@app/core/list-config/list-config.service';
import * as _ from 'lodash';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'anms-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesCreateComponent extends KongBaseComponent implements OnInit {

  @Input() existingData: any;

  form: FormGroup;
  errorMsg: string;
  submitting: boolean;
  fields: any;
  entity: string;
  baseEndpoint: string;
  objectKeys = Object.keys;

  constructor(public kong: KongApiService,
              public notificationService: NotificationService,
              public translate: TranslateService,
              public dialog: DialogService,
              public store: Store<AppState>,
              private listConfigService: ListConfigService,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private dialogRef: MatDialogRef<ServicesCreateComponent>) {
    super(kong, notificationService, translate, dialog, store);

    this.entity = `service`
    this.fields = this.makeIterableFields(_.get(this.listConfigService, `models.${this.entity}.fields`, []));
    this.baseEndpoint = _.get(this.listConfigService, `models.${this.entity}.endpoint`, '');
    console.log('Fields =>', this.fields);

  }

  ngOnInit() {
    this.createControls();
  }

  makeIterableFields(fields) {
    const iterable = _.map(fields, field => {
      const key = Object.keys(field)[0];
      const obj = {
        name : key,
        label: _.upperFirst(key.split('_').join(' '))
      }

      return _.merge(obj, field[key])
    })

   return iterable;
  }

  createControls() {
    const controls = {};
    this.fields.forEach(field => {
      const key = field.name;

      // Create validators
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.match)  validators.push(Validators.pattern(field.match));

      const control = [_.get(this.existingData, key, field.default), Validators.compose(validators)];

      controls[key] = control;
    });

    this.form = this.fb.group(controls);
  }


  close() {
    this.dialogRef.close();
  }

  async submit(data) {
    this.submitting = true;
    try {
      const response = await this.create(data);
      console.log('Created service', response);
      this.dialogRef.close(response);
    }catch (error) {
      console.error('Failed to create service', error);
    }

    this.submitting = false;
    this.cd.detectChanges();
  }

  private async create(data) {
   return  this.kong.post(`${this.baseEndpoint}`, data).toPromise();
  }

  private update() {

  }

}
