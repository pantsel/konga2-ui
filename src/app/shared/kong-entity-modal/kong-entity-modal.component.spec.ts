import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KongEntityModalComponent } from './kong-entity-modal.component';

describe('KongEntityModalComponent', () => {
  let component: KongEntityModalComponent;
  let fixture: ComponentFixture<KongEntityModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KongEntityModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KongEntityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
