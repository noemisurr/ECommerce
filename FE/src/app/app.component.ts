import { Component } from '@angular/core';
import { LoaderService } from './routes/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FakeIkea';
  status: boolean = false

  constructor(private loaderService: LoaderService) {
    this.loaderService.isActive$
      .subscribe((status: boolean) => this.status = status);
  }
}
