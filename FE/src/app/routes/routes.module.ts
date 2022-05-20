import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { LoaderService } from './loader.service';

@NgModule({
  declarations: [HomeComponent, AuthComponent],
  imports: [ReactiveFormsModule],
  exports: [HomeComponent, AuthComponent],
  providers: [LoaderService],
})
export class RoutesModule {}
