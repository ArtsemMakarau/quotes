import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingStarComponent } from './rating-star.component';

describe('RatingStarComponent', () => {
  let component: RatingStarComponent;
  let fixture: ComponentFixture<RatingStarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingStarComponent],
    });
    fixture = TestBed.createComponent(RatingStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set rating to 0 if first star is clicked and rating is already 1', () => {
    const starValue = 1;

    component.rating = 1;
    component.disabled = false;

    spyOn(component.ratingChanged, 'emit');

    component.countStar(starValue);

    expect(component.rating).toBe(0);
    expect(component.ratingChanged.emit).toHaveBeenCalledWith(0);
  });

  it('should set rating to the clicked star value if not first star', () => {
    const starValue = 3;

    component.rating = 1;
    component.disabled = false;

    spyOn(component.ratingChanged, 'emit');

    component.countStar(starValue);

    expect(component.rating).toBe(starValue);
    expect(component.ratingChanged.emit).toHaveBeenCalledWith(starValue);
  });

  it('should not update rating if component is disabled', () => {
    const starValue = 2;

    component.rating = 1;
    component.disabled = true;

    spyOn(component.ratingChanged, 'emit');

    component.countStar(starValue);

    expect(component.rating).toBe(1);
    expect(component.ratingChanged.emit).not.toHaveBeenCalled();
  });
});
