import { Component, OnInit } from '@angular/core';
import { SharedStateService } from '@shared/modules';

@Component({
  selector: 'product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {
  stateTemp;

  constructor( private stateService: SharedStateService ) {

    this.stateTemp = this.stateService.stateTemp;

  }

  ngOnInit(): void {
  }

}
