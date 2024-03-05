/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthorsUpdateService } from './authors-update.service';

describe('Service: AuthorsUpdate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorsUpdateService]
    });
  });

  it('should ...', inject([AuthorsUpdateService], (service: AuthorsUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
