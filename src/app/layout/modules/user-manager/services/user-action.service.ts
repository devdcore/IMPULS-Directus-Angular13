import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  SharedStateService,
  UserDto,
} from '@shared/modules';
// services
import { UserApiService } from '@user-manager/services';

@Injectable({
  providedIn: 'root',
})
export class UserActionService {
  stateTemp;

  constructor(
    private stateService: SharedStateService,
    private apiService: UserApiService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  onGetUserList(params?: any): void {
    // API CALL
    this.apiService.getUserList(params).subscribe({
      next: (data) => {
        console.log({
          onGetUserList: this.stateTemp.userControl.userList,
        });
      },
      error: (error) => {
        console.log;
        this.stateTemp.angularError = error;
      },
      complete: () => console.log('onGetUserList Complete'),
    });
  }

  onGetUserItem(id: number, params?: string): void {
    // API CALL
    this.apiService.getUserItem(id, params).subscribe({
      next: (data) => {
        console.log({
          onGetUserItem: this.stateTemp.userControl.userSelected,
        });
      },
      error: (error) => {
        console.log;
        this.stateTemp.angularError = error;
      },
      complete: () => console.log('onGetUserItem Complete'),
    });
  }

  onGetCurrenUser() {
    let temp = sessionStorage.getItem('currentUser');
    temp ? (this.stateTemp.accessControl.currentUser = JSON.parse(temp)) : null;
  }

  getReadOnly(): boolean {
    let result = true;

    if (
      this.stateTemp.userControl.userMode == 'edit' ||
      this.stateTemp.userControl.userMode == 'new'
    ) {
      result = false;
    }

    return result;
  }

  onSaveNewUser(item: UserDto) {
    // API CALL
    this.apiService.createUser(item).subscribe({
      next: (data) => {
        console.log({
          onSaveNewUser: this.stateTemp.userControl.userSelected,
          currentState: (this.stateTemp.userControl.userMode = 'view'),
        });
      },
      error: (error) => {
        console.log;
        this.stateTemp.angularError = error;
      },
      complete: () => console.log('onSaveNewUser Complete'),
    });
  }
  onSaveExistingUser(item: UserDto) {
    // API CALL
    this.apiService.updateUser(item).subscribe({
      next: (data) => {
        console.log({
          onSaveNewUser: this.stateTemp.userControl.userSelected,
          currentState: (this.stateTemp.userControl.userMode = 'view'),
        });
      },
      error: (error) => {
        console.log;
        this.stateTemp.angularError = error;
      },
      complete: () => console.log('onSaveNewUser Complete'),
    });
  }

  onArchiveCurrentUser() {}

  onGetRolesList(params?: string) {
    // API CALL
    this.apiService.getRolesList().subscribe({
      next: (data) => {
        console.log({
          userRoleList: this.stateTemp.userControl.userRoleList,
        });
      },
      error: (error) => {
        console.log;
        this.stateTemp.angularError = error;
      },
      complete: () => console.log('onGetRolesList Complete'),
    });
  }

  onPatchValueAgency(filedName: string) {
    this.stateTemp.userControl.userForm.patchValue({
      '[filedName]': this.stateTemp.userControl.userForm.value['filedName'],
    });

    // this.stateTemp.userControl.userSelected[
    //   filedName as keyof UserEntity
    // ] = this.stateTemp?.userControl?.userForm?.value['filedName'] as any;
  }
}
