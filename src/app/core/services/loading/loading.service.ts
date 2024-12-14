import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}
  show() {
    this.loadingSubject.next(true); // Set the loading state to true
  }

  hide() {
    this.loadingSubject.next(false); // Set the loading state to false
  }
}
