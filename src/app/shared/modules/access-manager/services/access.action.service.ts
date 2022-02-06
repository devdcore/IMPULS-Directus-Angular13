import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AccessApiService } from './access.api.service';
// services
import { AccessStateService } from './access.state.service';

@Injectable({
  providedIn: 'root',
})
export class AccessActionService {
  stateTemp;

  constructor(
    private stateService: AccessStateService,
    private apiService: AccessApiService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }
}
