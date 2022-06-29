import { Injectable } from "@angular/core";
import { HomeService } from "./home/services/home.service";
import { CategoryService } from "./pages/account/services/category.service";
import { ColorService } from "./pages/account/services/color.service";
import { ContactService } from "./pages/account/services/contact.service";
import { CartService } from "./shop/collection/services/cart.service";

@Injectable()
export class AppInitService {
  constructor(
    private contactService: ContactService,
    private colorService: ColorService,
    private homeService: HomeService,
    private categoryService: CategoryService
  ) {}

  init(): Promise<void[]> {
    return Promise.all([
      this.contactService.getContact().toPromise(),
      this.colorService.getAllColors().toPromise(),
      this.homeService.getAllMedia().toPromise(),
      this.categoryService.getAll().toPromise()
      // wishlist service
    ]);
  }
}
