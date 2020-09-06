import { TestBed } from '@angular/core/testing';

import { SearchFalconService } from './search-falcon.service';

describe('SearchFalconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchFalconService = TestBed.get(SearchFalconService);
    expect(service).toBeTruthy();
  });
});
