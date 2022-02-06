import { Injectable } from '@angular/core';

// vendor
import { BehaviorSubject } from 'rxjs';

import { SharedState } from '@shared-manager/models';

/************************************************* */

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  private subject = new BehaviorSubject<SharedState>(new SharedState());
  state = this.subject.asObservable();

  stateTemp = new SharedState();

  constructor() {
    this.state.subscribe((state) => (this.stateTemp = state));
  }

  // state
  stateObjectChange(record: SharedState) {
    this.subject.next(record);
  }

  // localStorage
  setLocalStorage(item: string, data: any) {
    // let dataString: string = '';
    if (item && data) {
      localStorage.setItem(item, JSON.stringify(data));
      return;
    } else {
      return null;
    }
  }

  getLocalStorage(item: string) {
    let dataString = localStorage.getItem(item);
    if (dataString) {
      return JSON.parse(dataString);
    } else {
      return null;
    }
  }
}
