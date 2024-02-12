import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { AddRating, GetQuote } from 'src/app/state/quotes.actions';
import { Quote } from 'src/app/types/quote.type';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() public quotes!: Quote[];

  public currentIndex = 0;

  constructor(private readonly _store: Store) {}

  public ratingChanged(rating: number): void {
    this._store.dispatch(
      new AddRating(this.quotes[this.currentIndex].id, rating)
    );
  }

  public async next(): Promise<void> {
    if (this.currentIndex >= this.quotes.length - 1) {
      await firstValueFrom(this._store.dispatch(new GetQuote())).then(
        (_) => this.currentIndex++
      );
    } else {
      this.currentIndex++;
    }
  }

  public previous(): void {
    if (this.currentIndex === 0) return;

    this.currentIndex--;
  }

  public share(quote: string): void {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      quote
    )}`;
    window.open(twitterUrl, '_blank');
  }
}
