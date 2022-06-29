import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(price: number, discount?: number): any {
    const totalPrice = discount ? price - (price * discount / 100) : price;
    return totalPrice
  }

}
