import {OnInit, Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import * as _ from 'lodash';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'anms-kong-form-fields',
  templateUrl: './kong-form-fields.component.html',
  styleUrls: ['./kong-form-fields.component.css']
})
export class KongFormFieldsComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() fields: any;
  @Input() fieldName: string;

  // Chips stuff
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // console.log('KongFormFieldsComponent:OnInit', this.form, this.fields);
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

}
