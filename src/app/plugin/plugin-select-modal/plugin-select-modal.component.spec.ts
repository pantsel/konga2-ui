import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginSelectModalComponent } from './plugin-select-modal.component';

describe('PluginSelectModalComponent', () => {
  let component: PluginSelectModalComponent;
  let fixture: ComponentFixture<PluginSelectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluginSelectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
