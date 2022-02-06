import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// models
import {
  AngularError,
  DirectusLoginDTO,
  DirectusLoginResponse,
  DirectusLogoutDto,
  DirectusPasswordRequestDto,
  DirectusPasswordResetDto,
  UserAccessRegisterDTO,
} from '@shared-manager/models';
// services
import {
  SharedStateService,
  SharedStorageService,
} from '@shared-manager/services';

import { LandingApiService } from './landing.api.service';

@Injectable({
  providedIn: 'root',
})
export class LandingActionService {
  stateTemp; // = new LandingState();

  constructor(
    private stateService: SharedStateService,
    private sharedStorageService: SharedStorageService,
    private apiService: LandingApiService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  onReturnStart() {
    this.router.navigate(['/landing-management']);
  }

  onChangeLanguage(language: string | null) {
    this.stateTemp.accessControl.currentLanguage = language as string;
    sessionStorage.setItem(
      'currentLanguage',
      this.stateTemp.accessControl.currentLanguage as string
    );
  }

  /********************
   * Login to the backend and get back
   * a currentUser with access and refresh token
   */
  onLogin(loginForm: DirectusLoginDTO): void {
   // this.apiService.login(loginForm).subscribe(resp => { resp[0] })

    // Call api service
    this.apiService.login(loginForm).subscribe({
      next: (data: any) => {

        console.log(`DATA DEL NEXT DEL SUSCRIBE ${JSON.stringify(data)}`);
        
        console.log({ login_data: data });

      },
      error: (error) => {
        console.error(error);
        this.stateTemp.angularError = error;
      },
      complete: () => {
        console.log('onLogin complete');
        this.onGetUser();
      },
    });
  }

  /********************
   * Get user information
   */
  onGetUser(): void {




    // Call api service
    this.apiService.getUser().subscribe({
      next: (data: any) => {
        console.log({ getUser_data: data });
      },
      error: (error) => {
        console.error(error);
        this.stateTemp.angularError = error;
      },
      complete: () => {
        console.log('onGetUser complete');
        this.onGetOrganization();
      },
    });
  }

  onGetOrganization() {
    // API CALL
    this.apiService.getOrganization().subscribe({
      next: (data) => {
        console.log({ getOrganization_data: data });
      },
      error: (error) => {
        console.log({ error });
        this.stateTemp.angularError = error;
      },
      complete: () => {
        console.log('onGetOrganization Complete');
        if (this.stateTemp.accessControl.currentUser.userType == 'agency') {
          this.onGetAgency(this.stateTemp.accessControl.currentUser.agencyId);
        } else {
          this.stateTemp.agencyControl.agencySelected =
            this.stateTemp.accessControl.currentOrganization;
          sessionStorage.setItem(
            'agencySelected',
            JSON.stringify(this.stateTemp.accessControl.currentOrganization)
          );
        }
      },
    });
  }

  onGetAgency(params?: any) {
    // API CALL
    this.apiService.getAgency(params).subscribe({
      next: (data) => {
        console.log({ getAgency_data: data });
      },
      error: (error) => {
        console.log({ error });
        this.stateTemp.accessControl.currentAgency =
          this.stateTemp.accessControl.currentOrganization;
        this.stateTemp.angularError = error;
      },
      complete: () => {
        if (!this.stateTemp.accessControl.currentAgency.id) {
          this.stateTemp.accessControl.currentAgency =
            this.stateTemp.accessControl.currentOrganization;
        }
        console.log(console.log('onGetAgency complete'));
        this.router.navigate(['/landing-manager/home']);
      },
    });
  }

  /********************
   * Logout from both to the backend and forontend
   * remove all stored data
   * trigger removing all
   */
  onLogout() {
    // Clear all before starting
    this.router.navigate(['/landing-manager/login']);
    let temp = sessionStorage.getItem('currentSession');
    let tempJson = JSON.parse(temp as string).data.refresh_token;
    let refreshToken: DirectusLogoutDto = { refresh_token: tempJson };

    this.stateTemp.angularError = new AngularError();

    this.apiService.logout(refreshToken).subscribe({
      next: (data) => console.log,
      error: (error) => console.log,
      complete: () => {
        console.log();
        window.location.reload();
      },
    });
  }

  /********************
   * Create new users
   */
  onRegister(registerForm: UserAccessRegisterDTO): void {
    // Clear all before starting
    this.stateTemp.angularError = new AngularError();
    sessionStorage.clear();
    localStorage.clear();

    // Call api service to register
    this.apiService.register(registerForm).subscribe(
      (data) => {
        this.stateTemp.accessControl.currentSession =
          new DirectusLoginResponse();
        // After registered user has to login
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.stateTemp.angularError = error;
        console.error({ error: error });
      }
    );
  }

  /**************************************************** */

  onPasswordRequest(requestForm: DirectusPasswordRequestDto): void {
    // Clear all before starting
    this.stateTemp.angularError = new AngularError();
    sessionStorage.clear();
    // Call api service
    this.apiService.passwordRequest(requestForm).subscribe(
      (data: any) => {
        console.log({ data });

        // this.stateTemp.currentUser = data;
        // Clear local info

        // this.router.navigate( ['/landing-manager/recovery'] );
      },
      (error: any) => {
        console.log(error);
        this.stateTemp.angularError = error;
      }
    );
  }

  onPasswordReset(resetForm: DirectusPasswordResetDto): void {
    // resetForm = {
    //   "email": "admin@example.com",
    //   "password": "d1r3ct5us"
    // };

    // Clear all before starting
    this.stateTemp.angularError = new AngularError();
    sessionStorage.clear();
    // Call api service
    this.apiService.passwordReset(resetForm).subscribe(
      (data: any) => {
        console.log({ data });

        // this.stateTemp.currentUser = data;
        // Clear local info
        // this.router.navigate( ['/landing-manager/recovery'] );
      },
      (error: any) => {
        console.log(error);
        this.stateTemp.angularError = error;
      }
    );
  }
}
