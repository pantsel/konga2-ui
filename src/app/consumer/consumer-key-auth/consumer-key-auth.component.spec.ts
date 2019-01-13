import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerKeyAuthComponent } from './consumer-key-auth.component';

describe('ConsumerKeyAuthComponent', () => {
  let component: ConsumerKeyAuthComponent;
  let fixture: ComponentFixture<ConsumerKeyAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerKeyAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerKeyAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
