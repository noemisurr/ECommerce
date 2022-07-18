import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from 'src/app/shared/interfaces/interface';

@Component({
  selector: 'app-digital-sub-category',
  templateUrl: './digital-sub-category.component.html',
  styleUrls: ['./digital-sub-category.component.scss']
})
export class DigitalSubCategoryComponent implements OnInit {
  closeResult: string;
  products: ProductResponse[] = []
  searchValue = '';
  visible = false;
  searchedProduct: ProductResponse[] = []

  constructor(private modalService: NgbModal, private productService: ProductService) {}

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getAll().subscribe((res) => {
      this.products = res
      this.searchedProduct = [...this.products]
    })
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.searchedProduct = this.products.filter((item) => item.name.indexOf(this.searchValue) !== -1);
  }
}
