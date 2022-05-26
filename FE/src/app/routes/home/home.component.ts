import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
    autoplay: true
  };

  slides = [
    {id: 1, img: "../../../assets/images/home-two-hero-slide-img-1.png"},
    {id: 2, img: "../../../assets/images/home-two-hero-slide-img-2.png"},
    {id: 2, img: "../../../assets/images/home-two-hero-slide-img-2.png"},
    {id: 2, img: "../../../assets/images/home-two-hero-slide-img-2.png"}
  ]
  constructor() {}

  ngOnInit(): void {}
}
