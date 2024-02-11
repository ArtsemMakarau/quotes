import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesPageComponent } from './quotes-page.component';
import { NgxsModule, Store } from '@ngxs/store';
import { QuotesStateService } from 'src/app/state/quotes.state.service';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from 'src/app/containers/carousel/carousel.component';
import { DisplayBestQuotesPipe } from 'src/app/pipes/display-best-quotes.pipe';

describe('QuotesPageComponent', () => {
  let component: QuotesPageComponent;
  let fixture: ComponentFixture<QuotesPageComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([QuotesStateService]), HttpClientModule],
      declarations: [
        CarouselComponent,
        QuotesPageComponent,
        DisplayBestQuotesPipe,
      ],
    });
    fixture = TestBed.createComponent(QuotesPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
