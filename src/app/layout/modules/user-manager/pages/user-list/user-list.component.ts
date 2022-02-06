import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserActionService } from '@user-manager/services';
import { UserEntity, SharedStateService } from '@shared/modules';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: UserActionService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
    this.onGetUserList();
  }

  ngOnInit(): void {}

  onSearchUser() {
    let searchText = `&filter[name][_contains]=${this.stateTemp.userControl.userSearchString}`;
    this.stateTemp.userControl.userSearchString.length > 0
      ? this.actionService.onGetUserList(searchText)
      : this.actionService.onGetUserList('');
    console.log('hola', searchText);
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      this.onSearchUser();
    }
  }

  onGetUserList(params?: any) {
    params = '&fields=*.*';
    this.actionService.onGetUserList(params);
  }

  handleNew() {
    this.stateTemp.userControl.userMode = 'new';
    this.stateTemp.userControl.userSelected = new UserEntity();

    console.log({ new: this.stateTemp.userControl.userSelected });
    this.router.navigate(['/user-manager/user-detail']);
  }
}
