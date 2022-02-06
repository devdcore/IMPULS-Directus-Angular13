import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// services
import {
  SharedApiService,
  SharedStateService,
} from '@shared-manager/services';

@Injectable({
  providedIn: 'root',
})
export class SharedStorageService {
  stateTemp;

  constructor(
    private stateService: SharedStateService,
    private apiService: SharedApiService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  onGetCurrentUser() {
    let temp = sessionStorage.getItem('currentUser');
    if (temp) {
      this.stateTemp.accessControl.currentUser = JSON.parse(temp);
      this.stateTemp.accessControl.isLogged = true;
    }
  }

  onGetCurrentSession() {
    let temp = sessionStorage.getItem('currentSession');
    console.log({ temp });
    if (temp) {
      this.stateTemp.accessControl.currentSession = JSON.parse(temp);
      // this.stateTemp.accessControl.isLogged = true;
    }
  }
}
