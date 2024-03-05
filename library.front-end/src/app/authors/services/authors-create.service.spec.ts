import { TestBed } from '@angular/core/testing';

import { AuthorsCreateService } from './authors-create.service';

describe('AuthorsCreateService', () => {
  let service: AuthorsCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorsCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
