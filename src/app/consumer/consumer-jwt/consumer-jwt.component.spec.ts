import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerJwtComponent } from './consumer-jwt.component';

describe('ConsumerJwtComponent', () => {
  let component: ConsumerJwtComponent;
  let fixture: ComponentFixture<ConsumerJwtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerJwtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerJwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
