import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerCredentialsComponent } from './consumer-credentials.component';

describe('ConsumerCredentialsComponent', () => {
  let component: ConsumerCredentialsComponent;
  let fixture: ComponentFixture<ConsumerCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
