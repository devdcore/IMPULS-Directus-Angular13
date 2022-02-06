import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// vendor
import { Observable } from 'rxjs';
import {
  map,
  tap,
} from 'rxjs/operators';

// models
import {
  AgencyEntity,
  AngularError,
  DirectusLoginDTO,
  DirectusLoginResponse,
  DirectusLogoutDto,
  DirectusPasswordRequestDto,
  DirectusPasswordResetDto,
  OrganizationEntity,
  SharedState,
  UserAccessLoginDTO,
  UserAccessRegisterDTO,
  UserAuth,
  UserEntity,
  UserRegisterResponse,
} from '@shared-manager/models';
import { SharedStateService } from '@shared/modules';
// root
import {
  AccessEnvironmentService,
  AccessStateService,
} from '@shared/modules/access-manager/services';

/*************** */

@Injectable({
  providedIn: 'root',
})
export class LandingApiService {
  stateTemp;

  constructor(
    private http: HttpClient,
    private env: AccessEnvironmentService,
    private stateService: SharedStateService,
    private accessStateService: AccessStateService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }


  testFunc(): Observable<UserAuth>{

    const Observer = new Observable(suscriber => {
      suscriber.next(1);

    });

    return Observer;

  }


  login(item: DirectusLoginDTO): Observable<UserAuth> {
    sessionStorage.clear();
    localStorage.clear();
    this.stateTemp.clearErrorAndMessage();

    // this.accessStateService.stateTemp.authorization = true`

    const url = `${this.env.apiUrl}/auth/login`;

    //##########################################################################

    const urlDirectusTest = `http://localhost:8055/items/users_auth?fields=id,user_name&filter={"user_email":{"_eq":"${item.email}"}}`;

    console.log(`http://localhost:8055/items/users_auth?filter={"user_email":{"_eq":"${item.email}"}}`);
    

    const infoUser = {
      user_name: "dev04"
    };

    // let responseWpipe = this.http.get<UserAuth>(urlDirectusTest);

    // console.log(`SIN PIPE ${JSON.stringify(responseWpipe)}`);
    

    let responseAPITest = this.http.get<UserAuth>(urlDirectusTest).pipe(

        map((data: UserAuth) => data),
        
        tap((data: UserAuth) => {

          console.log(`DATA EN TAP ${JSON.stringify(data)}`);

            return data;
        })
    );

    return responseAPITest;

    console.log(`RESPONSE API DIRECTUS  ${JSON.stringify(responseAPITest)}`);

    // ################################################################################

    // let response = this.http.post<DirectusLoginResponse>(url, item).pipe(
    //   map((data: DirectusLoginResponse) => data),
    //   tap((data: DirectusLoginResponse) => {
    //     sessionStorage.setItem('currentSession', JSON.stringify(data));
    //     this.stateTemp.accessControl.currentSession = data;
    //     this.stateTemp.accessControl.isLogged = true;
    //     return data;
    //   })
    // );
    // return response;
  }

  getUser(): Observable<UserEntity> {
    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/users/me`;
    console.log({ url });
    let response = this.http.get<UserEntity>(url).pipe(
      map((data: any) => data.data),
      tap((data: UserEntity) => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
      }),
      tap((data: UserEntity) => {
        this.stateTemp.accessControl.currentUser = data;
        return data;
      })
    );
    return response;
  }

  logout(item: DirectusLogoutDto): Observable<any> {
    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/auth/logout`;
    let response = this.http.post<any>(url, item).pipe(
      map((data) => data),

      tap((data) => {
        this.stateTemp.accessControl.isLogged = false;
        sessionStorage.clear();
        localStorage.clear();
        this.stateTemp = new SharedState();
      })
    );

    return response;
  }

  passwordRequest(item: DirectusPasswordRequestDto): Observable<any> {
    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/auth/password/request`;
    let response = this.http.post<any>(url, item).pipe(map((data) => data));
    return response;
  }

  passwordReset(item: DirectusPasswordResetDto): Observable<any> {
    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/auth/password/reset`;
    let response = this.http.post<any>(url, item).pipe(map((data) => data));
    return response;
  }

  getSessionAndUser(item: DirectusLoginDTO): Observable<DirectusLoginResponse> {
    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/auth/login`;
    let response = this.http.post<DirectusLoginResponse>(url, item).pipe(
      map((data: DirectusLoginResponse) => data),
      tap((data: DirectusLoginResponse) => {
        sessionStorage.setItem('sessionStorage', JSON.stringify(data));
      })
    );

    return response;
  }

  getAgency(params?: number): Observable<AgencyEntity> {
    this.stateTemp.clearErrorAndMessage();

    const url = `${this.env.apiUrl}/items/agency_info/${params}`;
    console.log({ url });

    let response$: any = this.http.get<AgencyEntity>(url).pipe(
      map((agency: any) => agency.data),
      tap((x) => {
        sessionStorage.setItem('currentAgency', '');
        sessionStorage.setItem('currentAgency', JSON.stringify(x));
        sessionStorage.setItem('agencySelected', JSON.stringify(x));
        this.stateTemp.accessControl.currentAgency = x as AgencyEntity;
        this.stateTemp.agencyControl.agencySelected = x as AgencyEntity;
      })
    );
    return response$;
  }

  getOrganization(): Observable<OrganizationEntity> {
    this.stateTemp.clearErrorAndMessage();

    const url = `${this.env.apiUrl}/items/organization_info`;
    console.log({ url });

    let response$: any = this.http.get<OrganizationEntity>(url).pipe(
      map((organization: any) => organization.data),
      tap((x) => {
        sessionStorage.setItem('currentOrganization', JSON.stringify(x));
        this.stateTemp.accessControl.currentOrganization =
          x as OrganizationEntity;
      })
    );
    return response$;
  }

  /********************************************************************************************* */
  // UserLoginTokenResponse
  loginOld(item: UserAccessLoginDTO): Observable<any> {
    this.stateTemp.angularError = new AngularError();
    const url = `${this.env.apiUrl}/api/auth/login`;
    let response = this.http.post<any>(url, item).pipe(
      map((data) => {
        data;
      })
    );
    return response;
  }

  register(item: UserAccessRegisterDTO): Observable<UserRegisterResponse> {
    this.stateTemp.angularError = new AngularError();
    const url = `${this.env.apiUrl}/api/auth/register`;
    let response = this.http
      .post<UserRegisterResponse>(url, item)
      .pipe(map((data) => data));
    return response;
  }

  // getUser( id: string ): Observable<[UserLoginUserResponse]> {
  //   this.stateTemp.angularError = new AngularError();
  //   const url = `${ this.env.apiUrl }/api/landing-access/${ id }`;
  //   let response = this.http
  //     .get<[UserLoginUserResponse]>( url )
  //     .pipe( map( ( data ) => data ) );
  //   return response;
  // }

  getSystemText(): Observable<any[]> {
    this.stateTemp.angularError = new AngularError();
    const url = `${this.env.apiUrl}/systems`;
    let response = this.http.get<any[]>(url).pipe(map((data) => data));
    return response;
  }

  listAll(): Observable<any[]> {
    this.stateTemp.angularError = new AngularError();
    const url = `${this.env.apiUrl}/api/landing-access`;
    let response = this.http.get<any[]>(url).pipe(map((data) => data));
    return response;
  }

  delete(item: string): Observable<any> {
    this.stateTemp.angularError = new AngularError();
    const url = `${this.env.apiUrl}/api/accounting-period/${item}`;
    let response = this.http.delete<any>(url).pipe(map((data) => data));
    return response;
  }

  create(item: any): Observable<any> {
    this.stateTemp.angularError = new AngularError();
    const url = `${this.env.apiUrl}/api/accounting-period`;
    let response = this.http.post<any>(url, item).pipe(map((data) => data));
    return response;
  }

  update(id: string, item: any): Observable<any> {
    this.stateTemp.angularError = new AngularError();
    const url = `${this.env.apiUrl}/api/accounting-period/${id}`;
    let response = this.http.patch<any>(url, item).pipe(map((data) => data));
    return response;
  }

  findByFilter(item: any): Observable<any[]> {
    this.stateTemp.angularError = new AngularError();
    let query = JSON.stringify({ field: item });
    const url = `${this.env.apiUrl}/api/accounting-period/find-by-filter`;
    return this.http.post<any[]>(url, item).pipe(
      map((data) => data),
      map((data) => {
        // delete data.__CUSTOM__
        return data;
      })
    );
  }
}
