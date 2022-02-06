import { Injectable } from '@angular/core';

import { SharedStateService } from '@shared/modules';

/************************************************* */

@Injectable({
  providedIn: 'root',
})
export class AccessStateService {
  stateTemp;
  constructor(private stateService: SharedStateService) {
    this.stateTemp = this.stateService.stateTemp;
  }
}
