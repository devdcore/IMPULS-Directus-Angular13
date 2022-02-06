import {
  Component,
  OnInit,
} from '@angular/core';

import { SharedStateService } from '@shared/modules';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit {
  user;
  stateTemp;
  constructor(private stateService: SharedStateService) {
    this.stateTemp = this.stateService.stateTemp;
    this.user =
      this.stateService.stateTemp.accessControl.currentUser.first_name +
      ' ' +
      this.stateService.stateTemp.accessControl.currentUser.last_name;
  }

  ngOnInit(): void {}
}
