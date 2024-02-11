import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.scss'],
})
export class RatingStarComponent {
  @Input() public rating = 0;
  @Input() public disabled!: boolean;

  @HostBinding('class.small')
  @Input()
  public small = false;

  @Output() public ratingChanged = new EventEmitter<number>();

  public readonly stars: number[] = [1, 2, 3, 4, 5];

  public countStar(starValue: number): void {
    if (this.disabled) return;

    const firstStar = 1;

    if (this.rating === starValue && starValue === firstStar) {
      const resetRatingValue = 0;

      this.rating = resetRatingValue;
    } else {
      this.rating = starValue;
    }

    this.ratingChanged.emit(this.rating);
  }
}
