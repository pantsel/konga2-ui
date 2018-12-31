import { TestBed } from '@angular/core/testing';

import { BootService } from './boot.service';

describe('BootService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BootService = TestBed.get(BootService);
    expect(service).toBeTruthy();
  });
});
