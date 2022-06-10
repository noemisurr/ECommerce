import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/shop/interfaces/interface';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact: IContact

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContact().subscribe((res) => {
      this.contact = res[0]
    })
  }

}
