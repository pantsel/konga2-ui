import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerBasicAuthComponent } from './consumer-basic-auth.component';

describe('ConsumerBasicAuthComponent', () => {
  let component: ConsumerBasicAuthComponent;
  let fixture: ComponentFixture<ConsumerBasicAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerBasicAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerBasicAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
