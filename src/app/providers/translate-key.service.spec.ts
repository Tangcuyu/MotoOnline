import { TestBed } from '@angular/core/testing';

import { TranslateKeyService } from './translate-key.service';

describe('TranslateKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslateKeyService = TestBed.get(TranslateKeyService);
    expect(service).toBeTruthy();
  });
});
