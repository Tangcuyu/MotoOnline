import { TestBed, inject } from '@angular/core/testing';

import { UserCheckService } from './user-check.service';

describe('UserCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCheckService]
    });
  });

  it('should be created', inject([UserCheckService], (service: UserCheckService) => {
    expect(service).toBeTruthy();
  }));
});
