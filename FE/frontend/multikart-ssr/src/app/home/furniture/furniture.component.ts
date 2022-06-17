import { Component, OnInit } from "@angular/core";
import { HomeService } from "../services/home.service";
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ProductService } from "src/app/shop/collection/services/product.service";
import { IProductSpecial } from "src/app/shop/interfaces/interface";

@Component({
  selector: "app-furniture",
  templateUrl: "./furniture.component.html",
  styleUrls: ["./furniture.component.scss"],
})
export class FurnitureComponent implements OnInit {
  public themeLogo: string = "assets/images/icon/logo-12.png"; // Change Logo

  public products: IProductSpecial;
  public productCollections = [{label: 'ON SALE', value: 'sale'}, {label: 'NEW ARRIVAL', value: 'new'}, {label: 'BEST SELLERS', value: 'best'}]
  public sliders = [];
  // Collection banner
  public collections = [];
  background: SafeStyle

  constructor(
    public productService: ProductService,
    private homeService: HomeService,
  ) {}

  // public blogs = [
  //   {
  //     image: "assets/images/blog/14.jpg",
  //     date: "25 January 2018",
  //     title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
  //     by: "John Dio",
  //   },
  //   {
  //     image: "assets/images/blog/15.jpg",
  //     date: "26 January 2018",
  //     title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
  //     by: "John Dio",
  //   },
  //   {
  //     image: "assets/images/blog/16.jpg",
  //     date: "27 January 2018",
  //     title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
  //     by: "John Dio",
  //   },
  //   {
  //     image: "assets/images/blog/14.jpg",
  //     date: "28 January 2018",
  //     title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
  //     by: "John Dio",
  //   },
  // ];

  ngOnInit(): void {
    this.background = this.homeService.background
    this.sliders = this.homeService.sliders
    this.collections = this.homeService.collections
    this.productService.getAllSpecial().subscribe((res) => {
      this.products = res
    })
    
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products?.[collection]
  }
}
