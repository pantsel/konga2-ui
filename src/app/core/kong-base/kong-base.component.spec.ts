import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KongBaseComponent } from './kong-base.component';

describe('KongBaseComponent', () => {
  let component: KongBaseComponent;
  let fixture: ComponentFixture<KongBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KongBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KongBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
