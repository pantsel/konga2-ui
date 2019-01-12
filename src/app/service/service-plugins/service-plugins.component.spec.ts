import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePluginsComponent } from './service-plugins.component';

describe('ServicePluginsComponent', () => {
  let component: ServicePluginsComponent;
  let fixture: ComponentFixture<ServicePluginsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePluginsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePluginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
