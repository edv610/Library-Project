import { TestBed } from '@angular/core/testing';

import { AuthorsReadService } from './authors-read.service';

describe('AuthorsReadService', () => {
  let service: AuthorsReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorsReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
