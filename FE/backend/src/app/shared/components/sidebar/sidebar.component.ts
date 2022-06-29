import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { User } from '../../interfaces/interface';
import { NavService, Menu } from '../../service/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  public menuItems: Menu[];
  public url: any;
  public fileurl: any;
  name: string = '';
  initials: string

  constructor(
    private router: Router,
    public navServices: NavService,
    private authService: AuthService
  ) {
    this.navServices.items.subscribe((menuItems) => {
      this.menuItems = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter((items) => {
            if (items.path === event.url) this.setNavActive(items);
            if (!items.children) return false;
            items.children.filter((subItems) => {
              if (subItems.path === event.url) this.setNavActive(subItems);
              if (!subItems.children) return false;
              subItems.children.filter((subSubItems) => {
                if (subSubItems.path === event.url)
                  this.setNavActive(subSubItems);
              });
            });
          });
        }
      });
    });
  }

  ngOnInit(): void {
    this.authService.me().subscribe(
      (res: User) => {
        this.name = res.name + ' ' + res.surname
        this.initials = res.name.charAt(0) + res.surname.charAt(0)
      }
    );
  }

  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter((menuItem) => {
      if (menuItem != item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach((a) => {
        if (this.menuItems.includes(item)) a.active = false;
        if (!a.children) return false;
        a.children.forEach((b) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  }

  //Fileupload
  readUrl(event: any) {
    if (event.target.files.length === 0) return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }
}
