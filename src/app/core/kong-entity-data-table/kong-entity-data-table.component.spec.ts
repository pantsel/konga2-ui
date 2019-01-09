import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KongEntityDataTableComponent } from './kong-entity-data-table.component';

describe('KongEntityDataTableComponent', () => {
  let component: KongEntityDataTableComponent;
  let fixture: ComponentFixture<KongEntityDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KongEntityDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KongEntityDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
