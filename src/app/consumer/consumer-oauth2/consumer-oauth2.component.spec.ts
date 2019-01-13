import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerOauth2Component } from './consumer-oauth2.component';

describe('ConsumerOauth2Component', () => {
  let component: ConsumerOauth2Component;
  let fixture: ComponentFixture<ConsumerOauth2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerOauth2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerOauth2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
