import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteConsumersComponent } from './route-consumers.component';

describe('RouteConsumersComponent', () => {
  let component: RouteConsumersComponent;
  let fixture: ComponentFixture<RouteConsumersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteConsumersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteConsumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
