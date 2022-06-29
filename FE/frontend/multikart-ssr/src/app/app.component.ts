import { Component, PLATFORM_ID, Inject, AfterViewChecked } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, NavigationStart, Router} from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService, translate: TranslateService, private router: Router, private viewScroller: ViewportScroller) {
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'fr']);
    }
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      // this.viewScroller.scrollToPosition([0, 0]);
      document.body.scrollTop = 0;
    })

    // this.router.events.subscribe((event:any)=>{
    //   if(event.routerEvent){
    //     console.log(event.routerEvent)
    //     document.body.scrollTop = 0;
    //   }
    // })
  }

}
