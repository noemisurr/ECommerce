import { Component, OnInit, Input } from "@angular/core";
import { ContactService } from "src/app/pages/account/services/contact.service";
import { IContact } from "src/app/shop/interfaces/interface";

@Component({
  selector: "app-footer-one",
  templateUrl: "./footer-one.component.html",
  styleUrls: ["./footer-one.component.scss"],
})
export class FooterOneComponent implements OnInit {
  @Input() class: string = "footer-light"; // Default class
  @Input() themeLogo: string = "assets/images/icon/logo-12.png"; // Default Logo
  @Input() newsletter: boolean = true; // Default True

  public today: number = Date.now();
  contact: IContact;
  telephone: string;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contact = this.contactService.contact
  }
}
