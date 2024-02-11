import { TestBed } from '@angular/core/testing';

import { QuotesHttpService } from './quotes-http.service';
import { HttpClientModule } from '@angular/common/http';

describe('QuotesHttpService', () => {
  let service: QuotesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(QuotesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
