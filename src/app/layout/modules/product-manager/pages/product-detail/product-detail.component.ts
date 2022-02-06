import {
  Component,
  OnInit,
} from '@angular/core';

import { SharedStateService } from '@shared/modules';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  stateTemp;
  constructor(private stateService: SharedStateService) {
    this.stateTemp = this.stateService.stateTemp;
  }
  ngOnInit(): void {}
}
