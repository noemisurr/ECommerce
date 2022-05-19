import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {

  isActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  startLoader(): void {
    this.isActive$.next(true);
  }

  stopLoader(): void {
    this.isActive$.next(false);
  }

}
