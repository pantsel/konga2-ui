import { TestBed } from '@angular/core/testing';

import { AppEventsService } from './app-events.service';

describe('AppEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppEventsService = TestBed.get(AppEventsService);
    expect(service).toBeTruthy();
  });
});
