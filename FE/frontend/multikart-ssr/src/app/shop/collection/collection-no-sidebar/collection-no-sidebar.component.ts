import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from '../services/product.service';
import { IProduct } from '../../interfaces/interface';

@Component({
  selector: 'app-collection-no-sidebar',
  templateUrl: './collection-no-sidebar.component.html',
  styleUrls: ['./collection-no-sidebar.component.scss']
})
export class CollectionNoSidebarComponent implements OnInit {

  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  public products: IProduct[] = [];
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  take: number = 12

  constructor(private route: ActivatedRoute, private router: Router, private viewScroller: ViewportScroller, public productService: ProductService) {   
      // Get Query params..
      this.route.queryParams.subscribe(params => {
        console.log(params)
        if( params.sortBy === 'a-z' || params.sortBy === 'z-a' ) this.sortBy = params.sortBy == 'a-z' ? 'asc' : 'desc';
        if( params.sortBy === 'low' || params.sortBy === 'high' ) this.sortBy = params.sortBy == 'low' ? 'asc' : 'desc';
        
        this.pageNo = params.page ? params.page : this.pageNo;
        this.getProducts((this.pageNo - 1)* this.take, this.take, this.sortBy)
      })
  }

  ngOnInit(): void {}

  getProducts(skip: number, take: number, sortBy: string) {
    this.productService.getAll(skip, take, sortBy).subscribe((res) => {
      this.products = res
    })
    this.paginate = this.productService.getPager(33, +this.pageNo); 
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null},
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if(value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-3 col-md-6';
  }

}
