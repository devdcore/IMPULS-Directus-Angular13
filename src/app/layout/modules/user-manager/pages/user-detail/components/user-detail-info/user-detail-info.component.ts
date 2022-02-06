import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { UserActionService } from '@user-manager/services';
import { SharedStateService, UserEntity } from '@shared/modules';

@Component({
  selector: 'user-detail-info',
  templateUrl: './user-detail-info.component.html',
  styleUrls: ['./user-detail-info.component.scss'],
})
export class UserDetailInfoComponent implements OnInit {
  stateTemp;
  date_updated: any;
  user_updated: any;
  user_status: any;

  constructor(
    private stateService: SharedStateService,
    private actionService: UserActionService
  ) {
    this.stateTemp = stateService.stateTemp;
    // this.date_updated = this.getLastUpdate();
    this.user_updated = this.getLastUser();
    this.user_status = this.stateTemp.userControl.userSelected.status;
  }

  ngOnInit(): void {}

  // getLastUpdate() {
  //   let lastDate = '';

  //   if (!this.stateTemp.userControl.userSelected.date_updated) {
  //     lastDate = moment(
  //       this.stateTemp.userControl.userSelected.date_created
  //     ).fromNow();
  //   } else {
  //     lastDate = moment(
  //       this.stateTemp.userControl.userSelected.date_updated
  //     ).fromNow();
  //   }

  //   lastDate == 'Invalid date' ? (lastDate = '') : '';

  //   return lastDate;
  // }

  getLastUser() {
    let lastUser;
    let user;

    //   if (!this.stateTemp.userControl.userSelected.user_updated) {
    //     user = this.stateTemp.userControl.userSelected
    //       .user_created as UserEntity;
    //     lastUser = user.first_name + ' ' + user.last_name;
    //   } else {
    //     user = this.stateTemp.userControl.userSelected
    //       .user_updated as UserEntity;
    //     lastUser = user.first_name + ' ' + user.last_name;
    //   }

    //   lastUser == 'undefined undefined' ? (lastUser = '') : '';

    //   return lastUser;
    // }
  }
}
