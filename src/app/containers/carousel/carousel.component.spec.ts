import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import { NgxsModule, Store } from '@ngxs/store';
import { QuotesStateService } from 'src/app/state/quotes.state.service';
import { HttpClientModule } from '@angular/common/http';
import { GetQuote } from 'src/app/state/quotes.actions';
import { of } from 'rxjs';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([QuotesStateService]), HttpClientModule],
      declarations: [CarouselComponent],
    });

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment currentIndex when currentIndex < quotes.length - 1', () => {
    component.currentIndex = 0;
    component.quotes = [
      {
        id: 'HTn2Q6e3AYr',
        quote: 'If you wish to be a writer, write.',
        author: 'Epictetus',
        rating: 5,
      },
      {
        id: 'nx2M9kL0EgcI',
        quote: 'Do good by stealth, and blush to find it fame.',
        author: 'Alexander Pope',
        rating: 3,
      },
      {
        id: 'Yg7xaxX5bj',
        quote:
          'Government of the people, by the people, for the people, shall not perish from the Earth.',
        author: 'Abraham Lincoln',
        rating: 4,
      },
    ];

    const spyDispatch = spyOn(store, 'dispatch');

    component.next();

    expect(component.currentIndex).toBe(1);
    expect(spyDispatch).not.toHaveBeenCalled();
  });

  it('should dispatch GetQuote and increment currentIndex when currentIndex >= quotes.length - 1', () => {
    component.currentIndex = 2;
    component.quotes = [
      {
        id: 'HTn2Q6e3AYr',
        quote: 'If you wish to be a writer, write.',
        author: 'Epictetus',
        rating: 5,
      },
      {
        id: 'nx2M9kL0EgcI',
        quote: 'Do good by stealth, and blush to find it fame.',
        author: 'Alexander Pope',
        rating: 3,
      },
      {
        id: 'Yg7xaxX5bj',
        quote:
          'Government of the people, by the people, for the people, shall not perish from the Earth.',
        author: 'Abraham Lincoln',
        rating: 4,
      },
    ];

    const spyDispatch = spyOn(store, 'dispatch');

    spyDispatch.and.returnValue(of(null));

    component.next();

    expect(component.currentIndex).toBe(3);
    expect(store.dispatch).toHaveBeenCalledWith(new GetQuote());
  });

  it('should decrement currentIndex if currentIndex > 0', () => {
    component.currentIndex = 2;
    component.previous();

    expect(component.currentIndex).toBe(1);
  });

  it('should not decrement currentIndex if currentIndex is 0', () => {
    component.currentIndex = 0;
    component.previous();

    expect(component.currentIndex).toBe(0);
  });

  it('should open a new window with correct Twitter URL', () => {
    spyOn(window, 'open');

    const quote = 'This is a test quote';
    const expectedUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      quote
    )}`;

    component.share(quote);

    expect(window.open).toHaveBeenCalledWith(expectedUrl, '_blank');
  });
});
