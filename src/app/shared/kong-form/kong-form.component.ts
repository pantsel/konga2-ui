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

@Component({
  selector: 'anms-kong-form',
  templateUrl: './kong-form.component.html',
  styleUrls: ['./kong-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KongFormComponent implements OnInit {

  @Input() existingData: any;
  @Input() entity: any;
  @Output() submitted: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  errorMsg: string;
  errorFields = {};
  submitting: boolean;
  fields: any;
  baseEndpoint: string;

  arrays = {};

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
          this.arrays[field.name] = [];
          field.default = []
          control = this.fb.array(_.get(this.existingData, key, []));
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
        response = await this.update(data);
        console.log('Updated service', response);
        this.notificationService.success(this.translate.instant('konga.changes_saved_success'));
      }else{
        response = await this.create(data);
        console.log('Created service', response);
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
    return  this.kong.post(`${this.baseEndpoint}`, data).toPromise();
  }

  private update(data) {
    return  this.kong.patch(`${this.baseEndpoint}/${this.existingData.id}`, data).toPromise();
  }

}
