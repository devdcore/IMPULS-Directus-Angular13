import {
  Component,
  OnInit,
} from '@angular/core';

import { LandingActionService } from '@landing-manager/services';
import { SharedStateService } from '@shared-manager/services';

@Component({
  selector: 'logged-message',
  templateUrl: './logged-message.component.html',
  styleUrls: ['./logged-message.component.scss'],
})
export class LoggedMessageComponent implements OnInit {
  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: LandingActionService
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  ngOnInit(): void {}

  onLogout() {
    this.actionService.onLogout();
  }
}
