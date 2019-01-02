import { TestBed } from '@angular/core/testing';

import { ListConfigService } from './list-config.service';

describe('ListConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListConfigService = TestBed.get(ListConfigService);
    expect(service).toBeTruthy();
  });
});
