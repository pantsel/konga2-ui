import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerGroupsComponent } from './consumer-groups.component';

describe('ConsumerGroupsComponent', () => {
  let component: ConsumerGroupsComponent;
  let fixture: ComponentFixture<ConsumerGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
