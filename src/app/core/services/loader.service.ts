import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoadingFromHttp: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoadingFromView: boolean = false;

  public operationCallingCount: number = 0;

  constructor() { }

  show() {
    this.operationCallingCount++;
    this.isLoadingFromView = true;
  }

  hide() {
    this.operationCallingCount--;

    if (this.operationCallingCount <= 0)
      this.isLoadingFromView = false;
  }
}