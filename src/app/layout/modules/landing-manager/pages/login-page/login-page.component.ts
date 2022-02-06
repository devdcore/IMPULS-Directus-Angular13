import {
  Component,
  OnInit,
} from '@angular/core';

import { SharedStateService } from '@shared-manager/services';
import { SharedStorageService } from '@shared/modules';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private sharedStorageService: SharedStorageService
  ) {
    this.stateTemp = this.stateService.stateTemp;
    this.sharedStorageService.onGetCurrentUser();
  }

  ngOnInit(): void {}
}
