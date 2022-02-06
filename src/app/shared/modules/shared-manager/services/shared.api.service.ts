import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// root
import {
  AccessEnvironmentService,
} from '@shared/modules/access-manager/services';
import { SharedStateService } from '@shared/modules/shared-manager/services';

interface OpportunityParams {
  limit: number;
}

/*************** */

@Injectable({
  providedIn: 'root',
})
export class SharedApiService {
  stateTemp;

  constructor(
    private http: HttpClient,
    private env: AccessEnvironmentService,
    private stateService: SharedStateService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  setLocalStorage(item: string, data: any) {
    let dataString: string = '';
    if (item && data) {
      localStorage.setItem(item, JSON.stringify(data));
    }
  }

  getLocalStorage(item: string) {
    let dataString = localStorage.getItem(item);
    if (dataString) {
      return JSON.parse(dataString);
    }
  }

  repalceAgencyValues(item: any, agency: any) {}
}
