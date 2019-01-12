import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePluginsComponent } from './route-plugins.component';

describe('RoutePluginsComponent', () => {
  let component: RoutePluginsComponent;
  let fixture: ComponentFixture<RoutePluginsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutePluginsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutePluginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
