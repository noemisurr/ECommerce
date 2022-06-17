import { Injectable } from '@angular/core';
import { HomeService } from './home/services/home.service';
import { ColorService } from './pages/account/services/color.service';
import { ContactService } from './pages/account/services/contact.service';

@Injectable()
export class AppInitService {

  constructor(private contactService: ContactService, private colorService: ColorService, private homeService: HomeService) { }

  init(): Promise<void[]> {
    return Promise.all([
      this.contactService.getContact().toPromise(),
      this.colorService.getAllColors().toPromise(),
      this.homeService.getAllMedia().toPromise()
    ]);
  }
}
