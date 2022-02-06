import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { ProductActionService } from '@product-manager/services';
import { SharedStateService, UserEntity } from '@shared/modules';

@Component({
  selector: 'product-detail-info',
  templateUrl: './product-detail-info.component.html',
  styleUrls: ['./product-detail-info.component.scss'],
})
export class ProductDetailInfoComponent implements OnInit {
  stateTemp;
  date_updated: any;
  user_updated: any;
  user_status: any;

  constructor(
    private stateService: SharedStateService,
    private actionService: ProductActionService
  ) {
    this.stateTemp = stateService.stateTemp;
    this.date_updated = this.getLastUpdate();
    this.user_updated = this.getLastUser();
    this.user_status = this.stateTemp.productControl.productSelected.status;
  }

  ngOnInit(): void {}

  getLastUpdate() {
    let lastDate = '';

    if (!this.stateTemp.productControl.productSelected.date_updated) {
      lastDate = moment(
        this.stateTemp.productControl.productSelected.date_created
      ).fromNow();
    } else {
      lastDate = moment(
        this.stateTemp.productControl.productSelected.date_updated
      ).fromNow();
    }

    lastDate == 'Invalid date' ? (lastDate = '') : '';

    return lastDate;
  }

  getLastUser() {
    let lastUser;
    let user;

    // if (!this.stateTemp.productControl.productSelected.user_updated) {
    //   user = this.stateTemp.productControl.productSelected
    //     .user_created as UserEntity;
    //   lastUser = user.first_name + ' ' + user.last_name;
    // } else {
    //   user = this.stateTemp.productControl.productSelected
    //     .user_updated as UserEntity;
    //   lastUser = user.first_name + ' ' + user.last_name;
    // }

    lastUser == 'undefined undefined' ? (lastUser = '') : '';

    return lastUser;
  }
}
