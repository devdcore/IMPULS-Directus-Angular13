import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserActionService } from '@user-manager/services';
import { UserEntity, SharedStateService } from '@shared/modules';

@Component({
  selector: 'user-detail-toolbar',
  templateUrl: './user-detail-toolbar.component.html',
  styleUrls: ['./user-detail-toolbar.component.scss'],
})
export class UserDetailToolbarComponent implements OnInit {
  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: UserActionService,
    private router: Router
  ) {
    this.stateTemp = stateService.stateTemp;

    if (!this.stateTemp.userControl.userSelected) {
      this.stateTemp.userControl.userSelected = new UserEntity();
      this.stateTemp.userControl.userMode = 'new';
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onGetUserItem(params?: any) {
    let id = 0; //this.stateTemp.userControl.userSelected.id as number
    params = '?fields=*,userId.*,userId.role.*';
    this.actionService.onGetUserItem(id, params);
  }

  isEditMode(): boolean {
    let result = false;
    if (this.stateTemp.userControl.userMode == 'edit') {
      result = true;
    }
    return result;
  }

  isUserFormValid() {
    let result = false;
    if (
      this.stateTemp.userControl.userForm.valid &&
      !this.stateTemp.userControl.userForm.pristine
    ) {
      result = true;
    }
    return result;
  }

  handleEdit() {
    this.stateTemp.userControl.userMode = 'edit';
  }

  handleSave() {}

  // onReturnUserList() {
  //   this.router.navigate(['user-manager/user-list']);
  // }
}
