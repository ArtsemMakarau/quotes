import { TestBed } from '@angular/core/testing';
import { DisplayBestQuotesPipe } from './display-best-quotes.pipe';

describe('DisplayBestQuotesPipe', () => {
  let pipe: DisplayBestQuotesPipe;

  beforeEach(() => {
    pipe = new DisplayBestQuotesPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null if there are less than 3 quotes with ratings', () => {
    const quotes = [
      {
        id: 'HTn2Q6e3AYr',
        quote: 'If you wish to be a writer, write.',
        author: 'Epictetus',
        rating: 0,
      },
      {
        id: 'nx2M9kL0EgcI',
        quote: 'Do good by stealth, and blush to find it fame.',
        author: 'Alexander Pope',
        rating: 0,
      },
      {
        id: 'Yg7xaxX5bj',
        quote:
          'Government of the people, by the people, for the people, shall not perish from the Earth.',
        author: 'Abraham Lincoln',
        rating: 0,
      },
      {
        id: '19XnsDE_kpQq',
        quote:
          'You cannot step twice into the same river, for other waters are continually flowing in.',
        author: 'Heraclitus',
        rating: 4,
      },
      {
        id: 'yIC09d9set',
        quote:
          'Every man is a damn fool for at least five minutes every day; wisdom consists in not exceeding the limit.',
        author: 'Elbert Hubbard',
        rating: 3,
      },
    ];

    const result = pipe.transform(quotes);

    expect(result).toBeNull();
  });

  it('should return the top 3 quotes with ratings', () => {
    const quotes = [
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

    const result = pipe.transform(quotes);

    expect(result).toEqual([
      {
        id: 'HTn2Q6e3AYr',
        quote: 'If you wish to be a writer, write.',
        author: 'Epictetus',
        rating: 5,
      },
      {
        id: 'Yg7xaxX5bj',
        quote:
          'Government of the people, by the people, for the people, shall not perish from the Earth.',
        author: 'Abraham Lincoln',
        rating: 4,
      },
      {
        id: 'nx2M9kL0EgcI',
        quote: 'Do good by stealth, and blush to find it fame.',
        author: 'Alexander Pope',
        rating: 3,
      },
    ]);
  });
});
