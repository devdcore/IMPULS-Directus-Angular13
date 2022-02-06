import {
  Component,
  OnInit,
} from '@angular/core';

import { ProductActionService } from '@product-manager/services';
import { SharedStateService } from '@shared/modules';

@Component({
  selector: 'product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.scss'],
})
export class ProductHeaderComponent implements OnInit {
  user;
  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: ProductActionService
  ) {
    this.stateTemp = this.stateService.stateTemp;
    this.user =
      this.stateService.stateTemp.accessControl.currentUser.first_name +
      ' ' +
      this.stateService.stateTemp.accessControl.currentUser.last_name;
  }

  ngOnInit(): void {}
}
