import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { IMediaHome } from "../interfaces/home.interface";
import { HomeService } from "../services/home.service";
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: "app-furniture",
  templateUrl: "./furniture.component.html",
  styleUrls: ["./furniture.component.scss"],
})
export class FurnitureComponent implements OnInit, OnDestroy {
  public themeLogo: string = "assets/images/icon/logo-12.png"; // Change Logo

  public products: Product[] = [];
  public productCollections: any[] = [];
  public sliders = [];
  // Collection banner
  public collections = [];
  background: SafeStyle

  constructor(
    public productService: ProductService,
    private homeService: HomeService,
    private sanitizer: DomSanitizer
  ) {
    this.productService.getProducts.subscribe((response) => {
      this.products = response.filter((item) => item.type == "furniture");
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        });
      });
    });
  }

  public blogs = [
    {
      image: "assets/images/blog/14.jpg",
      date: "25 January 2018",
      title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
      by: "John Dio",
    },
    {
      image: "assets/images/blog/15.jpg",
      date: "26 January 2018",
      title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
      by: "John Dio",
    },
    {
      image: "assets/images/blog/16.jpg",
      date: "27 January 2018",
      title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
      by: "John Dio",
    },
    {
      image: "assets/images/blog/14.jpg",
      date: "28 January 2018",
      title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
      by: "John Dio",
    },
  ];

  ngOnInit(): void {
    this.homeService.getAllMedia().subscribe((res) => {
      res.forEach((media) => {
        if (parseInt(media.id_position) == 1) {
          this.background =this.sanitizer.bypassSecurityTrustStyle('url(' + media.url + ')')
        }
        if (parseInt(media.id_position) == 2) {
          this.sliders.push({
            title: "furniture sofa",
            subTitle: media.name,
            image: media.url,
          });
        }
        if (parseInt(media.id_position) == 3) {
          this.collections.push({
            image: media.url,
            save: "save 50%",
            title: media.name,
            link: "/home/left-sidebar/collection/furniture",
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty("--theme-deafult");
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find((i) => i === collection)) {
        return item;
      }
    });
  }
}
