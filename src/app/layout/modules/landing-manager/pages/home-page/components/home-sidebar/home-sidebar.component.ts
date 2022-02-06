import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { LandingActionService } from '@landing-manager/services';
import {
  SharedStateService,
  SharedStorageService,
} from '@shared/modules';

@Component({
  selector: 'home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.scss'],
})
export class HomeSidebarComponent implements OnInit {
  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: LandingActionService,
    private sharedStorageService: SharedStorageService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
   // this.sharedStorageService.onGetCurrentUser();
    // !this.stateTemp.accessControl.isLogged
    //   ? this.router.navigate(['./landing-manager/login'])
    //   : null;
  }

  ngOnInit(): void {}

  onGetUser() {
    this.actionService.onGetUser();
  }

  onRefreshToken() {
    // this.actionService.onRefreshToken()
  }
}
