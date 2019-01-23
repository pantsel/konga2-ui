import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {KongApiService} from '@app/core/api/kong-api.service';
import {NotificationService} from '@app/core';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {KongPlugin} from '@app/core/entities/kong-plugin';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  @Input() context: string;
  @Output() submitted: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  errorMsg: string;
  errorFields = {};
  submitting: boolean;
  fields: any;
  baseEndpoint: string;
  isPlugin: boolean;

  // Consumers
  consumers: any;
  filteredConsumers: Observable<string[]>;

  // Chips stuff
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public kong: KongApiService,
              public notificationService: NotificationService,
              public translate: TranslateService,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef) {

  }

  ngOnInit() {

    this.isPlugin = this.entity instanceof KongPlugin;

    // Mutate existing Data in case of plugins.
    // We need to bring the config properties to the top object level
    // so that everything is compatible with our business logic.
    // We will recreate the `config` object when we submit the form
    if (this.existingData && this.isPlugin) {
      this.existingData = _.merge(this.existingData, this.existingData.config);
      delete this.existingData.config;
    }

    console.log('existingData =>', this.existingData);

    this.fields = this.makeIterableFields(this.entity.fields || []);
    this.fields.forEach(field => {
      if (field.type === 'record') {
        field.fields = this.makeIterableFields(field.fields || []);
      }
    })
    console.log('Iterable fields =>', this.fields);

    this.baseEndpoint = this.entity.endpoint;
    console.log('Fields =>', this.fields);
    this.initControls(this.fields);
    this.getConsumers();
  }


  /**
   * Get all Kong consumers to be used as auto-complete options
   */
  getConsumers() {
    if (!this.isPlugin) return false;
    this.kong.get(`consumers`)
      .subscribe(consumers => {
        console.log(`Got Consumers =>`, consumers);
        this.consumers = consumers;
        this.filteredConsumers = this.form.get('consumer').valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : (value.username || value.custom_id || value.id)),
          map(value => this._filterConsumers(value))
        );

        let initialValue = null;
        const existingConsumer = _.get(this.existingData, 'consumer') || _.get(this.extras, 'consumer');
        if (existingConsumer) {
          initialValue = _.find(this.consumers, item => item.id === existingConsumer.id) || existingConsumer;
        }
        this.form.get('consumer').patchValue(initialValue);
        this.form.get('consumer').enable();

      })
  }


  /**
   * Create iterable fields out of the
   * object based schema Kong provides
   * @param fields
   */
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


  /**
   * Initialize the form controls
   */
  initControls(fields) {
    // const controls = {};
    // fields.forEach(field => {
    //   const key = field.name;
    //
    //   // Create validators
    //   const validators = [];
    //   if (field.required) validators.push(Validators.required);
    //   if (field.match)  validators.push(Validators.pattern(field.match));
    //
    //   let control;
    //
    //   switch (field.type) {
    //     case 'set':
    //     case 'array':
    //
    //       field.default = field.default || [];
    //
    //       // Monkey patch in case the default value comes as an empty object {}
    //       try {
    //         if (JSON.stringify(field.default) === '{}') {
    //           field.default = []
    //         };
    //       }catch (e) {
    //
    //       }
    //
    //       control = this.fb.array(_.get(this.existingData, key, field.default));
    //       break;
    //     default:
    //       control = [_.get(this.existingData, key, field.default), Validators.compose(validators)];
    //
    //   }
    //
    //   controls[key] = control;
    // });

    const controls = this.createControls(fields);
    console.log('createControls =>', controls)

    this.form = this.fb.group(controls);

    if (this.isPlugin) {
      this.form.addControl('consumer', new FormControl());
      this.form.get('consumer').disable(); // We will enable this when we fetch the consumers from Kong
    }

    console.log('Form ==============>', this.form)
  }


  createControls(fields, path?) {

    const controls = {};

    fields.forEach(field => {
      const key = field.name;

      // Create validators
      const validators = [];
      if (field.required) validators.push(Validators.required);
      // if (field.match)  validators.push(Validators.pattern(field.match));

      let control;

      switch (field.type) {
        case 'set':
        case 'array':

          field.default = field.default || [];

          // Monkey patch in case the default value comes as an empty object {}
          try {
            if (JSON.stringify(field.default) === '{}') {
              field.default = []
            };
          }catch (e) {

          }
          control = this.fb.array(_.get(this.existingData, path ? `${path}.${key}` : key, field.default));
          break;
        case 'record':
          control = this.fb.group(this.createControls(field.fields, field.name));
          break;
        default:
          control = [_.get(this.existingData, key, field.default), Validators.compose(validators)];

      }

      controls[key] = control;
    });

    return controls;
  }




  displayFn(consumer): string | undefined {
    return consumer ? ( consumer.username || consumer.custom_id || consumer.id ) : undefined;
  }

  /**
   * Filter consumer field auto-complete options based on input
   * @param value
   * @private
   */
  private _filterConsumers(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.consumers.filter(consumer => {
      return ( consumer.username && consumer.username.toLowerCase().indexOf(filterValue) > -1 )
        || ( consumer.custom_id && consumer.custom_id.toLowerCase().indexOf(filterValue) > -1 )
        || consumer.id.toLowerCase().indexOf(filterValue) > -1
    });
  }


  /**
   * Add chip to array fields
   * @param event
   * @param field
   */
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


  /**
   * Remove chip from array fields
   * @param index
   * @param field
   */
  remove(index: number, field: string): void {
    const control = this.form.get(field) as FormArray;
    if (index >= 0) {
      control.removeAt(index);
    }
  }


  /**
   * Chip with autocomplete select handler
   * @param event
   * @param field
   */
  onChipAutocompleteOptionSelected(event: MatAutocompleteSelectedEvent, field): void {
    // const input = event.option.input;
    const value = event.option.viewValue;

    // Add our requirement
    if ((value || '').trim()) {
      const control = this.form.get(field) as FormArray;
      control.push(this.fb.control(value.trim()));
    }

    const inputEl = document.getElementById(`input_${field}`);
    if (inputEl) inputEl['value'] = '';
  }

  /**
   * On an autocomplete chip, only show options
   * that haven't already been selected
   * @param availableOptions
   * @param selectedOptions
   */
  filterAvailableOptions(availableOptions, selectedOptions) {
    return _.difference(availableOptions, selectedOptions);
  }



  /**
   * Submit the form
   * @param data
   */
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
    const finalData = this.requestData(this.cleanUpData(data));
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

    if (this.isPlugin) {

      const topLevelKeys = ['name', 'enabled', 'consumer', 'service', 'route'];

      const topLvlObj = _.pickBy(data, (value, key) => topLevelKeys.indexOf(key) > -1);
      const configObj = {
        config: _.pickBy(data, (value, key) => topLevelKeys.indexOf(key) < 0)
      };

      finalData = _.merge(topLvlObj, configObj);
    }else{
      finalData = data;
    }

    return finalData;
  }

  private cleanUpData(data) {
    for (const key in data) {
      if (data[key] === null) {
        delete data[key];
      }
    }

    if (data.consumer) {
      data.consumer = {
        id: data.consumer.id
      }
    }

    return data;
  }

}
