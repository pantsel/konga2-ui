import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {KongApiService} from '@app/core/api/kong-api.service';
import {NotificationService} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {KongPlugin} from '@app/core/entities/kong-plugin';

@Component({
  selector: 'anms-kong-form',
  templateUrl: './kong-form.component.html',
  styleUrls: ['./kong-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KongFormComponent implements OnInit {

  @Input() existingData: any;
  @Input() entity: any;
  @Input() extras: any;
  @Input() isModal: boolean;
  @Output() submitted: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  errorMsg: string;
  errorFields = {};
  submitting: boolean;
  fields: any;
  baseEndpoint: string;

  // Chips stuff
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public kong: KongApiService,
              public notificationService: NotificationService,
              public translate: TranslateService,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.fields = this.makeIterableFields(this.entity.fields || []);
    this.baseEndpoint = this.entity.endpoint;
    console.log('Fields =>', this.fields);
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

      let control;

      switch (field.type) {
        case 'array':

          field.default = field.default || [];

          // Monkey patch in case the default value comes as an empty object {}
          if (_.isObject(field.default)) {
            field.default = [];
          }

          control = this.fb.array(_.get(this.existingData, key, field.default));
          break;
        default:
          control = [_.get(this.existingData, key, field.default), Validators.compose(validators)];

      }

      controls[key] = control;
    });

    this.form = this.fb.group(controls);
  }


  add(event: MatChipInputEvent, field): void {
    const input = event.input;
    const value = event.value;

    // Add our requirement
    if ((value || '').trim()) {
      const control = this.form.get(field) as FormArray;
      control.push(this.fb.control(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(index: number, field: string): void {
    const control = this.form.get(field) as FormArray;
    if (index >= 0) {
      control.removeAt(index);
    }
  }

  async submit(data) {

    this.submitting = true;
    this.errorFields = {};
    this.errorMsg = '';

    let response;

    try {
      if (this.existingData) {
        response = await this.update(_.merge(data, this.extras || {}));
        console.log('Updated entity', response);
        this.notificationService.success(this.translate.instant('konga.changes_saved_success'));
      }else{
        response = await this.create(_.merge(data, this.extras || {}));
        console.log('Created entity', response);
        this.notificationService.success(this.translate.instant('konga.data_submitted_success'));
      }
      this.submitted.emit(response);
    }catch (error) {
      console.error('Failed to create service', error);
      this.errorFields = _.get(error, 'error.fields', {});

      Object.keys(this.errorFields).forEach(field => {
        if (this.form.controls[field]) {
          const errorObj = {}
          errorObj[field] = this.errorFields[field];
          this.form.controls[field].setErrors(errorObj);
        }
      })
      this.errorMsg = _.get(error, 'error.message', {});
    }

    this.submitting = false;
    this.cd.detectChanges();
  }

  private async create(data) {

    // Remove null values on create
    for (const key in data) {
      if (data[key] === null) {
        delete data[key];
      }
    }

    const finalData = this.requestData(data);
    console.log('Create entity', this.baseEndpoint, finalData);
    return  this.kong.post(`${this.baseEndpoint}`, finalData).toPromise();
  }

  private update(data) {
    const finalData = this.requestData(data);
    console.log('Update entity', `${this.baseEndpoint}/${this.existingData.id}`, finalData);
    return  this.kong.patch(`${this.baseEndpoint}/${this.existingData.id}`, finalData).toPromise();
  }

  private requestData(data) {
    let finalData;

    if (this.entity instanceof KongPlugin) {
      finalData = {
        name: data.name,
        enabled: data.enabled,
        config: _.pickBy(data, (value, key) => key !== 'name' && key !== 'enabled')
      }
    }else{
      finalData = data;
    }

    return finalData;
  }

}
