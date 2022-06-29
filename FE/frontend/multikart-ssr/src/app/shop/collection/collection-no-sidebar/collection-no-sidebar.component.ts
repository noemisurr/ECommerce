import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewportScroller } from "@angular/common";
import { ProductService } from "../services/product.service";
import { IProduct } from "../../interfaces/interface";

@Component({
  selector: "app-collection-no-sidebar",
  templateUrl: "./collection-no-sidebar.component.html",
  styleUrls: ["./collection-no-sidebar.component.scss"],
})
export class CollectionNoSidebarComponent implements OnInit {
  public grid: string = "col-xl-3 col-md-6";
  public layoutView: string = "grid-view";
  public products: IProduct[] = [];
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public obj: string = 'name';
  public search: string[];
  take: number = 12;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    private productService: ProductService
  ) {
    // Get Query params..
    this.route.queryParams.subscribe((params) => {
      this.sortBy = params.sortBy
      if (params.sortBy === "low" || params.sortBy === "high") {
        this.obj = 'discounted_price'
        this.sortBy = params.sortBy == "low" ? "asc" : "desc";
      }
      if (params.search)
        this.search = decodeURIComponent(params.search).match(
          /("[^"]+"|[^"\s]+)/g
        );
      this.pageNo = params.page ? params.page : this.pageNo;
      this.getProducts(
        (this.pageNo - 1) * this.take,
        this.take,
        this.sortBy,
        this.obj,
        params.search
      );
    });
  }

  ngOnInit(): void {}

  getProducts(skip: number, take: number, sortBy: string, obj: string, search: string) {
    this.productService.getAll(skip, take, sortBy, obj, search).subscribe((res) => {
      this.products = res.products;
      this.paginate = this.productService.getPager( res.numberItems, +this.pageNo);
    });
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { sortBy: value ? value : null },
        queryParamsHandling: "merge", // preserve the existing query params in the route
        skipLocationChange: false, // do trigger navigation
      })
      .finally(() => {
        this.viewScroller.scrollToAnchor("products"); // Anchore Link
      });
  }

  onTagClose(tagName: string) {
    let params: string = "";
    this.search.filter((tag) => {
      if (tag != tagName) {
        params += " " + tag;
      }
    });
    params
      ? this.router.navigateByUrl(
          `shop/list?search=${encodeURIComponent(params).match(
            /("[^"]+"|[^"\s]+)/g
          )}`
        )
      : this.router.navigateByUrl("shop/list");

    this.getProducts(
      (this.pageNo - 1) * this.take,
      this.take,
      this.sortBy,
      this.obj,
      params
    );
  }

  // product Pagination
  setPage(page: number) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { page: page },
        queryParamsHandling: "merge", // preserve the existing query params in the route
        skipLocationChange: false, // do trigger navigation
      })
      .finally(() => {
        this.viewScroller.scrollToAnchor("products"); // Anchore Link
      });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if (value == "list-view") this.grid = "col-lg-12";
    else this.grid = "col-xl-3 col-md-6";
  }
}
