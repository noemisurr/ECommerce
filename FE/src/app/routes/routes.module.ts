import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { LoaderService } from './loader.service';
import { ShopComponent } from './shop/shop.component';

@NgModule({
  declarations: [HomeComponent, AuthComponent, ShopComponent],
  imports: [ReactiveFormsModule, CarouselModule, BrowserAnimationsModule],
  exports: [HomeComponent, AuthComponent],
  providers: [LoaderService],
})
export class RoutesModule {}
