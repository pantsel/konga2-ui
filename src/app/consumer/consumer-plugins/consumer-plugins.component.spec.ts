import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerPluginsComponent } from './consumer-plugins.component';

describe('ConsumerPluginsComponent', () => {
  let component: ConsumerPluginsComponent;
  let fixture: ComponentFixture<ConsumerPluginsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerPluginsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerPluginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
