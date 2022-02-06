import {
  Component,
  OnInit,
} from '@angular/core';

import { AccessStateService } from './services';

@Component({
  selector: 'access-control',
  template: '<router-outlet></router-outlet>',
})
export class AccessControlRoot implements OnInit {
  stateTemp;
  constructor(private stateService: AccessStateService) {
    this.stateTemp = this.stateService.stateTemp;
  }

  ngOnInit(): void {}
}
