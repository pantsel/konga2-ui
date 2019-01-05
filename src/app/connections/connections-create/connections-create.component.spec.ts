import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionsCreateComponent } from './connections-create.component';

describe('ConnectionsCreateComponent', () => {
  let component: ConnectionsCreateComponent;
  let fixture: ComponentFixture<ConnectionsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
