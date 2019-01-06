import { TestBed } from '@angular/core/testing';

import { KongApiService } from './kong-api.service';

describe('KongApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KongApiService = TestBed.get(KongApiService);
    expect(service).toBeTruthy();
  });
});
