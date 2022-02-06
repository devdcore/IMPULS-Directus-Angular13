import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// vendor
import { Observable } from 'rxjs';
import {
  map,
  retry,
  tap,
} from 'rxjs/operators';

// models
import {
  RoleEntity,
  UserEntity,
} from '@shared-manager/models/';
import {
  SharedStateService,
  UserDto,
} from '@shared/modules';
// root
import {
  AccessEnvironmentService,
} from '@shared/modules/access-manager/services';

interface OpportunityParams {
  limit: number;
}

/*************** */

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  stateTemp;

  constructor(
    private http: HttpClient,
    private env: AccessEnvironmentService,
    private stateService: SharedStateService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  getUserList(params?: string): Observable<UserEntity[]> {
    this.stateTemp.clearErrorAndMessage();

    const url = `${this.env.apiUrl}/users/?meta=total_count&meta=filter_count${params}`;

    console.log({ url });

    let response = this.http.get<UserEntity[]>(url).pipe(
      retry(3),
      map((data: any) => data),
      tap((data: any) => {
        this.stateTemp.userControl.userList = data.data.map((temp: any) => {
          return {
            ...temp,
            logoImage:
              temp.logoImage == null || temp.logoImage == 'null'
                ? temp.logoUrl
                : `${this.env.apiUrl}` + '/' + temp.logoImage,
          };
        });
        this.stateTemp.userControl.userTotalCount = data.meta.total_count;
        this.stateTemp.userControl.userFilterCount = data.meta.filter_count;
        console.log({ stateTempGetUserList: this.stateTemp });
      })
    );
    return response;
  }

  getUserItem(id: number, params?: string): Observable<UserEntity> {
    console.log('start getUserItem');

    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/items/user_info/${id}${params}`;

    console.log({ url });

    let response = this.http.get<UserEntity>(url).pipe(
      map((data: any) => data.data),
      tap((data: any) => {
        console.log('Procesing.......');
        let temp = data;
        temp.logoImage =
          temp.logoImage == null || temp.logoImage == 'null'
            ? temp.logoUrl
            : `${this.env.apiUrl}` + '/' + temp.logoImage;
        this.stateTemp.userControl.userSelected = temp;
        // console.log({data})
        // console.log({userSelected: this.stateTemp.userControl.userSelected})
      })
    );
    return response;
  }

  opportunityList(params?: OpportunityParams): Observable<any> {
    this.stateTemp.clearErrorAndMessage();

    const url = `${this.env.apiUrl}/auth/login`;
    let response = this.http.get<any>(url).pipe(map((data) => data));
    return response;
  }

  toogleStatusUserItem(id: number, status: string) {
    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/items/user_info/${id}`;

    let body = {
      status: status == 'archived' ? 'published' : 'archived',
    };

    let response = this.http
      .patch<UserEntity>(url, body)
      .pipe(map((data: any) => data.data));
    return response;
  }

  createUser(item: UserDto): Observable<UserEntity> {
    console.log('start createUser');

    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/items/user_info/`;

    console.log({ url });

    let response = this.http.post<UserEntity>(url, item).pipe(
      retry(3),
      map((data: any) => data.data),
      tap((data: any) => {
        console.log('Procesing.......');
        let temp = data;
        temp.logoImage =
          temp.logoImage == null || temp.logoImage == 'null'
            ? temp.logoUrl
            : `${this.env.apiUrl}` + '/' + temp.logoImage;
        this.stateTemp.userControl.userSelected = temp;
        // console.log({data})
        // console.log({userSelected: this.stateTemp.userControl.userSelected})
      })
    );
    return response;
  }

  updateUser(item: UserDto): Observable<UserEntity> {
    console.log('updateUser', { item });

    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/items/user_info/${item.id}`;

    console.log({ url });

    let response = this.http.patch<UserEntity>(url, item).pipe(
      retry(3),
      map((data: any) => data.data),
      tap((data: any) => {
        console.log('Procesing.......');
        let temp = data;
        temp.logoImage =
          temp.logoImage == null || temp.logoImage == 'null'
            ? temp.logoUrl
            : `${this.env.apiUrl}` + '/' + temp.logoImage;
        this.stateTemp.userControl.userSelected = temp;
        // console.log({data})
        // console.log({userSelected: this.stateTemp.userControl.userSelected})
      })
    );
    return response;
  }

  getRolesList(params?: string): Observable<RoleEntity[]> {
    this.stateTemp.clearErrorAndMessage();

    const url = `${this.env.apiUrl}/roles`;

    console.log({ url });

    let response = this.http.get<RoleEntity[]>(url).pipe(
      retry(3),
      map((data: any) => data),
      tap((data: any) => {
        this.stateTemp.userControl.userRoleList = data.data.map(
          (temp: any) => temp
        );
        console.log({ userRoleList: this.stateTemp.userControl.userRoleList });
      })
    );
    return response;
  }
}
