import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// vendor
import { Observable } from 'rxjs';
import {
  map,
  tap,
} from 'rxjs/operators';

import { DirectusLoginResponse } from '@shared-manager/models';
// services
import {
  AccessEnvironmentService,
} from '@shared/modules/access-manager/services';

import { AccessStateService } from './access.state.service';

/*************** */

@Injectable({
  providedIn: 'root',
})
export class AccessApiService {
  stateTemp;
  constructor(
    private http: HttpClient,
    private env: AccessEnvironmentService,
    private stateService: AccessStateService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  refresh(): Observable<DirectusLoginResponse> {
    console.log('refresh');

    this.stateTemp.clearErrorAndMessage();

    let token;
    let temp = sessionStorage.getItem('currentSession');
    temp ? (token = JSON.parse(temp).data.refresh_token as string) : null;

    let refresh_token = {
      refresh_token: token,
    };

    console.log('token', refresh_token);

    this.stateService.stateTemp.accessControl.authorization = false;

    const url = `${this.env.apiUrl}/auth/refresh`;

    console.log('url', url);

    let response = this.http
      .post<DirectusLoginResponse>(url, refresh_token)
      .pipe(
        map((data: DirectusLoginResponse) => data),
        tap((data: DirectusLoginResponse) => {
          console.log({ data });
          sessionStorage.setItem('currentSession', JSON.stringify(data));
          this.stateService.stateTemp.accessControl.authorization = true;
          return data;
        })
      );
    return response;
  }
}
