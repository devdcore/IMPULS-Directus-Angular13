import {
  Component,
  OnInit,
} from '@angular/core';

import {
  SharedState,
  SharedStateService,
  SharedStorageService,
  UserEntity,
} from '@shared/modules';

import { AgencyEntity } from '../../';

@Component({
  selector: 'navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss'],
})
export class NavigationHeaderComponent implements OnInit {
  currentUser: UserEntity;
  currentAgency: AgencyEntity;
  stateTemp: SharedState;
  constructor(
    private stateService: SharedStateService,
    private actionService: SharedStorageService,
    private sharedStorageService: SharedStorageService
  ) {
    this.stateTemp = this.stateService.stateTemp;
    this.sharedStorageService.onGetCurrentUser();
    this.currentUser = this.stateService.stateTemp.accessControl.currentUser;
    this.currentAgency =
      this.stateService.stateTemp.accessControl.currentAgency;
  }

  ngOnInit(): void {}

  openCloseMenu() {
    this.stateTemp.sidebarControl.isShowSidebar =
      !this.stateTemp.sidebarControl.isShowSidebar;
  }
}
