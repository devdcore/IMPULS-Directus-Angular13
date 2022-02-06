import {
  Component,
  OnInit,
} from '@angular/core';

import { SharedStateService } from '@shared/modules';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
})
export class UserManagerComponent implements OnInit {
  gfg = false;
  stateTemp;
  constructor(private stateService: SharedStateService) {
    this.stateTemp = this.stateService.stateTemp;
  }

  ngOnInit(): void {}
}
