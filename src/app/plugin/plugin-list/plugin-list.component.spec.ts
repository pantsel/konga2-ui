import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginListComponent } from './plugin-list.component';

describe('PluginListComponent', () => {
  let component: PluginListComponent;
  let fixture: ComponentFixture<PluginListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluginListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
