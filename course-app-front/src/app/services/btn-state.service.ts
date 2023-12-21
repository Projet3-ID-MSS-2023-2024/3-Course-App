import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BtnStateService {
  constructor() { }

  private _btnDisable$ = new BehaviorSubject<boolean>(false);
  get btnDisable$() : Observable<boolean> {
    return this._btnDisable$.asObservable();
  }

  setState(state: boolean){
    this._btnDisable$.next(state);
  }
}
