import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  SharedStateService,
  SharedStorageService,
} from '@shared/modules';

@Component({
  selector: 'landing-footer',
  templateUrl: './landing-footer.component.html',
  styleUrls: ['./landing-footer.component.scss'],
})
export class LandingFooterComponent implements OnInit {
  TEMPLATE_TEXT = {
    authenticated: 'Authenticated',
    signedOut: 'Signed Out',
  };

  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private sharedStorageService: SharedStorageService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
    this.sharedStorageService.onGetCurrentUser();
    !this.stateTemp.accessControl.isLogged
      ? this.router.navigate(['./landing-manager/login'])
      : null;
  }

  ngOnInit(): void {}
}
