import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
import { IProduct } from 'src/app/shop/interfaces/interface';
import { ProductService } from 'src/app/shop/collection/services/product.service';

@Component({
  selector: 'app-product-box-one',
  templateUrl: './product-box-one.component.html',
  styleUrls: ['./product-box-one.component.scss']
})
export class ProductBoxOneComponent implements OnInit {

  @Input() product: IProduct;
  @Input() thumbnail: boolean = false; // Default False 
  @Input() onHowerChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = false; // Default False
  @Input() loader: boolean = false;
  
  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  public ImageSrc :string;
  isNew: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    if(this.loader) {
      this.productService.getById(this.product.id).subscribe((res) => {
        this.ImageSrc = res.variations[0]?.media[0]?.url;
        const now = new Date()
        const date = new Date(res.created_at)
        now.setDate(now.getDate() - 7);
        this.isNew = date > now
      })
      setTimeout(() => { 
        this.loader = false; 
      }, 2000); // Skeleton Loader
    }
    
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Change Variants
  ChangeVariants(color, product) {
    product.variants.map((item) => {
      if (item.color === color) {
        product.images.map((img) => {
          if (img.image_id === item.image_id) {
            this.ImageSrc = img.src;
          }
        })
      }
    })
  }

  // Change Variants Image
  ChangeVariantsImage(src) {
    this.ImageSrc = src;
  }

  addToCart(product: any) {
    // this.productService.addToCart(product);
  }

  addToWishlist(product: any) {
    // this.productService.addToWishlist(product);
  }

  addToCompare(product: any) {
    // this.productService.addToCompare(product);
  }

}
