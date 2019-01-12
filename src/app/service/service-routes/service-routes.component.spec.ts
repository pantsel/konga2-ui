import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRoutesComponent } from './service-routes.component';

describe('ServiceRoutesComponent', () => {
  let component: ServiceRoutesComponent;
  let fixture: ComponentFixture<ServiceRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
