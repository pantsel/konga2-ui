import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerHmacAuthComponent } from './consumer-hmac-auth.component';

describe('ConsumerHmacAuthComponent', () => {
  let component: ConsumerHmacAuthComponent;
  let fixture: ComponentFixture<ConsumerHmacAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerHmacAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerHmacAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
