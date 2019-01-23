import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KongFormFieldsComponent } from './kong-form-fields.component';

describe('KongFormFieldsComponent', () => {
  let component: KongFormFieldsComponent;
  let fixture: ComponentFixture<KongFormFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KongFormFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KongFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
