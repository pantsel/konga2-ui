import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionChooserComponent } from './connection-chooser.component';

describe('ConnectionChooserComponent', () => {
  let component: ConnectionChooserComponent;
  let fixture: ComponentFixture<ConnectionChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
