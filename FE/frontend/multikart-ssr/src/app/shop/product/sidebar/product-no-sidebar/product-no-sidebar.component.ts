import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ProductDetailsMainSlider,
  ProductDetailsThumbSlider,
} from "../../../../shared/data/slider";
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { ProductService } from "src/app/shop/collection/services/product.service";
import { IColor, IProduct } from "src/app/shop/interfaces/interface";

@Component({
  selector: "app-product-no-sidebar",
  templateUrl: "./product-no-sidebar.component.html",
  styleUrls: ["./product-no-sidebar.component.scss"],
})
export class ProductNoSidebarComponent implements OnInit {
  public product: IProduct
  public counter: number = 1;
  public selectedSize: any;
  currentVariationIndex: number = 0
  colors: IColor[] = []

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getById(this.route.snapshot.queryParams.id).subscribe((res) => {
      this.product = res
    })
    this.productService.getAllColors().subscribe((res) => {
      this.colors = res
    })
  }

  colorHex(id) {
    id = parseInt(id)
    const result = this.colors.find((color) => color.id === id )
    return result.hex
  }

  changeVariations(current: number) {
    this.currentVariationIndex = current
  }

  // Get Product Color
  // Color(variants) {
  //   const uniqColor = [];
  //   for (let i = 0; i < Object.keys(variants).length; i++) {
  //     if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
  //       uniqColor.push(variants[i].color);
  //     }
  //   }
  //   return uniqColor;
  // }

  // Get Product Size
  Size(variants) {
    const uniqSize = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size);
      }
    }
    return uniqSize;
  }

  selectSize(size) {
    this.selectedSize = size;
  }

  // Increament
  increment() {
    this.counter++;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter--;
  }

  // Add to cart
  async addToCart(product: any) {
    // product.quantity = this.counter || 1;
    // const status = await this.productService.addToCart(product);
    // if (status) this.router.navigate(["/shop/cart"]);
  }

  // Buy Now
  async buyNow(product: any) {
    // product.quantity = this.counter || 1;
    // const status = await this.productService.addToCart(product);
    // if (status) this.router.navigate(["/shop/checkout"]);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    // this.productService.addToWishlist(product);
  }
}
