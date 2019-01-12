import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceConsumersComponent } from './service-consumers.component';

describe('ServiceConsumersComponent', () => {
  let component: ServiceConsumersComponent;
  let fixture: ComponentFixture<ServiceConsumersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceConsumersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceConsumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
