import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IReview } from 'src/app/shop/interfaces/interface';
import { ReviewService } from '../account/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  reviews: IReview[]

  constructor(private route: ActivatedRoute, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.route.snapshot.queryParams.id // GET REVIEW FOR THIS PRODUCT ID
    this.reviewService.getById(this.route.snapshot.queryParams.id).subscribe((res) => {
      this.reviews = res
    })
  }

}
