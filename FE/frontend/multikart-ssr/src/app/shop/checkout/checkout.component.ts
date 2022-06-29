import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { IPayPalConfig, ICreateOrderRequest } from "ngx-paypal";
import { environment } from "../../../environments/environment";
import { AuthService } from "src/app/pages/account/services/auth.service";
import { CartService } from "../collection/services/cart.service";
import { ICartItem } from "../interfaces/interface";
import { User } from "src/app/pages/account/interfaces/auth.interface";
import { ExFormArray } from "src/app/shared/classes/extended-form-array";
import { CardService } from "src/app/shared/services/card.service";
import { OrderService } from "src/app/shared/services/order.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  checkoutForm = this.fb.group({
    selectedCard: [''],
    address: new ExFormArray(() =>
      this.fb.group({
        id: [""],
        flat: ["", [Validators.required]],
        address: ["", [Validators.required, Validators.maxLength(50)]],
        city: ["", Validators.required],
        cap: ["", Validators.required],
        region: ["", Validators.required],
        other: [""],
        default: [""],
        id_user: [""],
      })
    ),
    card: new ExFormArray(() =>
      this.fb.group({
        id: [""],
        owner: ["", [Validators.required]],
        number: ["", [Validators.required]],
        expiry: ["", [Validators.required]],
        cvc: ["", [Validators.required]],
        default: ["", [Validators.required]],
        id_user: ["", [Validators.required]]
      })
    ),
  });
  public payPalConfig?: IPayPalConfig;
  public payment: string = "Stripe";
  public amount: any;
  cart: ICartItem[];
  total: number
  selectedAddressIndex: number = 0
  selectedCardId: number
  currentUser: User

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private cardService: CardService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cartItem$.subscribe((res) => {
      this.cart = res.cartItems
      this.total = res.total
    })
    this.authService.me().subscribe((res) => {
      this.currentUser = res
      if(res.address.length != 0){
        this.addresses.setValues(res.address);
        this.addresses.disable();
      }else{
        this.addresses.setValues([{
          id: "",
          flat: "",
          address: "",
          city: "",
          cap: "", 
          region: "",
          other: "",
          default: true,
          id_user: res.id
        }])
      }
      if (res.cards.length != 0) {
        this.card.setValues(res.cards);
        this.checkoutForm.patchValue({selectedCard: res.cards[0].id})
        this.card.disable()
      } else {
        this.card.setValues([
          {
            id: "",
            owner: res.name + " " + res.surname,
            number: "",
            expiry: "",
            cvc: "",
            default: true,
            id_user: res.id
          },
        ]);
      }
    });
  }

  
  get addresses() {
    return this.checkoutForm.get("address") as ExFormArray;
  }
  get card() {
    return this.checkoutForm.get("card") as ExFormArray;
  }

  // ADDRESS
  
  onChangeSelectedAddress(event, index) {
    this.selectedAddressIndex = event ? index : this.selectedAddressIndex
  }
  onAddAddress() {
    this.currentUser.address.push(this.addresses.value[0]);
    this.authService.updateUser(this.currentUser).subscribe((res) => {
      this.addresses.value[0].id = res.address[0].id
    })
  }

  // Card

  onAddCard() {
    this.cardService.newUserCard(this.card.value[0]).subscribe(() => {});
  }


  onCheckout() {
    const addressId = this.addresses.value[this.selectedAddressIndex].id
    const cardId = this.checkoutForm.get('selectedCard').value

    this.orderService.newOrder(this.total, addressId, cardId).subscribe((res) => {
      this.cartService.emptyCart().subscribe()
      this.router.navigateByUrl(`shop/checkout/success?order=${res.id}`);
    })
  }

  // Paypal Payment Gateway
  // private initConfig(): void {
  //   this.payPalConfig = {
  //     currency: ".productService.Currency.currency",
  //     clientId: environment.paypal_token,
  //     createOrderOnClient: (data) =>
  //       <ICreateOrderRequest>{
  //         intent: "CAPTURE",
  //         purchase_units: [
  //           {
  //             amount: {
  //               currency_code: "this.productService.Currency.currency",
  //               value: this.amount,
  //               breakdown: {
  //                 item_total: {
  //                   currency_code: "this.productService.Currency.currency",
  //                   value: this.amount,
  //                 },
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     advanced: {
  //       commit: "true",
  //     },
  //     style: {
  //       label: "paypal",
  //       size: "small", // small | medium | large | responsive
  //       shape: "rect", // pill | rect
  //     },
  //     onApprove: (data, actions) => {
  //       // this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
  //       console.log(
  //         "onApprove - transaction was approved, but not authorized",
  //         data,
  //         actions
  //       );
  //       actions.order.get().then((details) => {
  //         console.log(
  //           "onApprove - you can get full order details inside onApprove: ",
  //           details
  //         );
  //       });
  //     },
  //     onClientAuthorization: (data) => {
  //       console.log(
  //         "onClientAuthorization - you should probably inform your server about completed transaction at this point",
  //         data
  //       );
  //     },
  //     onCancel: (data, actions) => {
  //       console.log("OnCancel", data, actions);
  //     },
  //     onError: (err) => {
  //       console.log("OnError", err);
  //     },
  //     onClick: (data, actions) => {
  //       console.log("onClick", data, actions);
  //     },
  //   };
  // }
}
