import { Component, OnInit, Input, HostListener, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { AuthService } from 'src/app/pages/account/services/auth.service';
import { ContactService } from 'src/app/pages/account/services/contact.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  
  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo-12.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = true; // Default false
  
  public stick: boolean = false;
  number?: string
  isLogged: boolean = false

  constructor(private contactService: ContactService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.number = this.contactService.contact.telephone
    this.authService.me().subscribe((res) => {
      this.isLogged = true
    }, (err) => {
      this.isLogged = false
    })
  }

  // @HostListener Decorator
  @HostListener("body:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 150 && window.innerWidth > 400) { 
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.isLogged = false
      this.router.navigateByUrl('/home')
    })
  }

}
